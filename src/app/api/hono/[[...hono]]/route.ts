import { handle } from "hono/vercel";

import honoApp from "@/server/hono/root";

export const runtime = "edge";

export const GET = handle(honoApp);
export const POST = handle(honoApp);
