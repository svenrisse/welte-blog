import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  likePost: protectedProcedure
    .input(z.object({ postName: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.upsert({
        where: {
          name: input.postName,
        },
        update: {
          Likes: {
            create: {
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          },
        },
        create: {
          name: input.postName,
          Likes: {
            create: {
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          },
        },
      });
    }),
  unlikePost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation((args) => {
      return args.ctx.db.like.delete({
        where: {
          postId_userId: {
            postId: args.input.postId,
            userId: args.ctx.session.user.id,
          },
        },
      });
    }),
  addComment: protectedProcedure
    .input(z.object({ postName: z.string(), text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.upsert({
        where: {
          name: input.postName,
        },
        update: {
          Comments: {
            create: {
              text: input.text,
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          },
        },
        create: {
          name: input.postName,
          Comments: {
            create: {
              text: input.text,
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          },
        },
      });
    }),
  deleteComment: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.comment.delete({
        where: {
          id: input.commentId,
        },
      });
    }),
  likeComment: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.comment.update({
        where: {
          id: input.commentId,
        },
        data: {
          CommentLikes: {
            create: {
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          },
        },
      });
    }),
  unlikeComment: protectedProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.commentLike.delete({
        where: {
          commentId_userId: {
            commentId: input.commentId,
            userId: ctx.session.user.id,
          },
        },
      });
    }),
  addResponse: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        text: z.string(),
        postName: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.comment.update({
        where: {
          id: input.commentId,
        },
        data: {
          Responses: {
            create: {
              text: input.text,
              user: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
              post: {
                connect: {
                  name: input.postName,
                },
              },
            },
          },
        },
      });
    }),
  getPostData: publicProcedure
    .input(z.object({ postName: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: {
          name: input.postName,
        },
        include: {
          Likes: {
            where: {
              userId: ctx.session?.user.id,
            },
          },
          _count: {
            select: {
              Likes: true,
              Comments: {
                where: {
                  originalCommentId: null,
                },
              },
            },
          },
        },
      });
    }),
  getComments: publicProcedure
    .input(
      z.object({
        postName: z.string(),
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(10).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const comments = await ctx.db.comment.findMany({
        where: {
          post: {
            name: input.postName,
          },
          originalCommentId: null,
        },
        include: {
          CommentLikes: {
            where: {
              userId: ctx.session?.user.id,
            },
          },
          _count: true,
          user: true,
          Responses: {
            include: {
              _count: true,
              user: true,
              CommentLikes: {
                where: {
                  userId: ctx.session?.user.id,
                },
              },
              Responses: {
                include: {
                  _count: true,
                  user: true,
                  CommentLikes: {
                    where: {
                      userId: ctx.session?.user.id,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: [
          {
            CommentLikes: {
              _count: "desc",
            },
          },
        ],
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
      });

      let nextCursor: typeof input.cursor | undefined = undefined;

      if (comments.length > input.limit) {
        const nextItem = comments.pop();
        nextCursor = nextItem!.id;
      }

      return {
        comments,
        nextCursor,
      };
    }),
});
