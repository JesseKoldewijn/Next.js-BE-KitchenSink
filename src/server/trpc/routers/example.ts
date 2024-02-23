import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc/core";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ message: z.string() }))
    .query(({ input }) => {
      const words = input.message.split(" ");
      const randomizeOrder = (arr: string[]) => {
        return arr.sort(() => Math.random() - 0.5);
      };
      const randomWords = randomizeOrder(words);
      return {
        message: {
          original: input.message,
          yodafied: randomWords.join(" "),
        },
      };
    }),
});
