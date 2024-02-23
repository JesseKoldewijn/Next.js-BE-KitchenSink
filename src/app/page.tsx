import { Suspense } from "react";

import { headers } from "next/headers";

import { api } from "@/trpc/server";

export const revalidate = 120000; // 2 minutes in ms

const Home = async () => {
  const headersList = headers();
  const domain = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") ?? "http";
  const rootUrl = `${proto}://${domain}`;
  const honoRoot = `${rootUrl}/api/hono/message`;

  const honoData = (await fetch(honoRoot, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: "This call is using hono",
    }),
  }).then((res) => res.json())) as {
    error?: string;
    message: {
      original: string;
      yodafied: string;
    };
  };
  const trpcData = await api.example.hello.query({
    message: "This call is using tRPC",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex w-full max-w-md flex-col items-center gap-4">
          <div className="w-full items-center justify-center text-center text-lg">
            <h2 className="text-2xl font-bold">tRPC</h2>
            <Suspense fallback="Loading tRPC query...">
              <ul>
                <li className="flex w-full items-center justify-center gap-2">
                  <span className="font-medium">Original:</span>
                  <span>{trpcData?.message.original}</span>
                </li>
                <li className="flex w-full items-center justify-center gap-2">
                  <span className="font-medium">Yoda style:</span>
                  <span>{trpcData?.message.yodafied}</span>
                </li>
              </ul>
            </Suspense>
          </div>
          <div className="w-full items-center justify-center text-center text-lg">
            <h2 className="text-2xl font-bold">Hono.js</h2>
            <Suspense fallback="Loading hono query...">
              <ul>
                <li className="flex w-full items-center justify-center gap-2">
                  <span className="font-medium">Original:</span>
                  <span>{honoData?.message.original}</span>
                </li>
                <li className="flex w-full items-center justify-center gap-2">
                  <span className="font-medium">Yoda style:</span>
                  <span>{honoData?.message.yodafied}</span>
                </li>
              </ul>
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
