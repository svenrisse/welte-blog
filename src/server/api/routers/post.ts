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
          Like: {
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
          Like: {
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
    .input(z.object({ postId: z.number() }))
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
  getLikes: publicProcedure
    .input(z.object({ postName: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.post.findUnique({
        where: {
          name: input.postName,
        },
        include: {
          Like: {
            where: {
              userId: ctx.session?.user.id,
            },
          },
          _count: true,
        },
      });
    }),
});
