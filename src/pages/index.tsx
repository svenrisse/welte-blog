import Head from "next/head";
import { useEffect, useState } from "react";
import client from "tina/__generated__/client";
import {
  PostConnectionEdges,
  type PostConnectionQuery,
} from "tina/__generated__/types";
import Header from "~/compontents/Header";
import { type Query } from "~/types/tina";
import PostPreview from "~/compontents/PostPreview";

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
      <PostPreview key={post?.node?.id} post={post as PostConnectionEdges} />
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
          {posts}
        </div>
      </main>
    </>
  );
}
