import Head from "next/head";
import { useEffect, useState } from "react";
import client from "tina/__generated__/client";
import {
  type PostConnectionEdges,
  type PostConnectionQuery,
} from "tina/__generated__/types";
import Header from "~/compontents/Header";
import PostPreview from "~/compontents/PostPreview";

export default function Home() {
  const [data, setData] = useState<PostConnectionQuery>();

  useEffect(() => {
    async function getPosts() {
      const postsResponse = await client.queries.postConnection();
      setData(postsResponse.data);
    }
    void getPosts();
  }, []);

  const posts = data?.postConnection.edges?.map((post) => {
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
        <div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16 ">
          {posts}
        </div>
      </main>
    </>
  );
}
