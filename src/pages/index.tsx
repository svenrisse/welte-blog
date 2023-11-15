import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import client from "tina/__generated__/client";
import { type PostConnectionQuery } from "tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Header from "~/compontents/Header";
import { Button } from "~/compontents/ui/button";
import { Textarea } from "~/compontents/ui/textarea";
import { type Query } from "~/types/tina";

export default function Home() {
  const [data, setData] = useState<Query<PostConnectionQuery>>();

  useEffect(() => {
    async function getPosts() {
      const postsResponse = await client.queries.postConnection();
      setData(postsResponse);
    }
    void getPosts();
  }, []);

  console.log(data);

  const posts = data?.data.postConnection.edges?.map((post) => {
    return (
      <Link href={`/blog/${post?.node?._sys.filename}`} key={post?.node?.id}>
        <div>
          <h2>{post?.node?.title}</h2>
          <p>{post?.node?.description}</p>
        </div>
      </Link>
    );
  });
  return (
    <>
      <Head>
        <title>Weltpinion</title>
        <meta name="description" content="Weltpinion | Blog by Welte" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="home" />
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex max-w-prose flex-col gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          </div>
          {posts}
        </div>
      </main>
    </>
  );
}
