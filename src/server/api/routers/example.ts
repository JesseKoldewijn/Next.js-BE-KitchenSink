import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc/core";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
