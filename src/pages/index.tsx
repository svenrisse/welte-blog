import Head from "next/head";
import { useEffect, useState } from "react";
import client from "tina/__generated__/client";
import { type PostQuery } from "tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Header from "~/compontents/Header";
import { Button } from "~/compontents/ui/button";
import { Textarea } from "~/compontents/ui/textarea";
import { type Query } from "~/types/tina";

export default function Home() {
  const [data, setData] = useState<Query<PostQuery>>();

  useEffect(() => {
    async function getPost() {
      const post = await client.queries.post({
        relativePath: "hello-world.md",
      });
      setData(post);
    }
    void getPost();
  }, []);

  console.log(data);
  return (
    <>
      <Head>
        <title>Weltpinion</title>
        <meta name="description" content="Weltpinion | Blog by Welte" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="home" />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex max-w-prose flex-col gap-4">
            <h2 className="text-3xl">{data?.data.post.title}</h2>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <TinaMarkdown content={data?.data.post.body} />
          </div>
          <Button variant={"secondary"}>Click me</Button>
          <Textarea />
        </div>
      </main>
    </>
  );
}
