import { Hono } from "hono";

import { rootRouter } from "./routers/root";

const honoApp = new Hono().basePath("/api/hono");

// Add routers
honoApp.route("/", rootRouter);

// Export appended Hono instance
export default honoApp;
