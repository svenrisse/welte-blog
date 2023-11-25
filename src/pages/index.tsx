import Head from "next/head";
import Header from "~/components/Header";
import PostList from "~/components/PostList";
export default function Home() {
  return (
    <>
      <Head>
        <title>Weltpinion</title>
        <meta name="description" content="Weltpinion | Blog by Welte" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="home" />
      <main className="flex w-screen flex-col items-center justify-center">
        <div className="w-full pb-6">
          <PostList take={8} hightlightFirst />
        </div>
      </main>
    </>
  );
}
