import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  likePost: protectedProcedure
    .input(z.object({ postName: z.string() }))
    .mutation((opts) => {
      return opts.ctx.db.post.upsert({
        where: {
          name: opts.input.postName,
        },
        update: { name: opts.input.postName },
        create: { name: opts.input.postName },
        select: {
          Like: {},
        },
      });
    }),
});
