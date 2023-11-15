import Head from "next/head";
import Header from "~/compontents/Header";
import PostList from "~/compontents/PostList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Weltpinion</title>
        <meta name="description" content="Weltpinion | Blog by Welte" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="home" />
      <main className="flex flex-col items-center justify-center">
        <div className="w-full px-6 py-6">
          <PostList />
        </div>
      </main>
    </>
  );
}
