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
  getPost: publicProcedure
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
          _count: true,
        },
      });
    }),
  getComments: publicProcedure
    .input(z.object({ postName: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.comment.findMany({
        where: {
          post: {
            name: input.postName,
          },
        },
        include: {
          user: true,
        },
        orderBy: [{ createdAt: "desc" }],
      });
    }),
});
