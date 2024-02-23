import { Hono } from "hono";

export const rootRouter = new Hono();

rootRouter.get("/", (c) => {
  return c.json({
    message: "Hello from hono!",
  });
});

rootRouter.post("/message", async (c) => {
  const body = (await c.req.json()) as unknown;
  const { message } = body as { message: string };

  if (!message) {
    c.status(400);
    return c.json({
      error: "You need to send a message!",
      message: null,
    });
  }

  const words = message.split(" ");

  const randomizeOrder = (arr: string[]) => {
    return arr.sort(() => Math.random() - 0.5);
  };
  const randomWords = randomizeOrder(words);

  return c.json({
    message: {
      original: message,
      yodafied: randomWords.join(" "),
    },
  });
});
