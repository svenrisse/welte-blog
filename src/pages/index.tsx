import Head from "next/head";
import Header from "~/components/Header";
import Home from "~/components/Home";

export default function Index() {
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
          <Home take={8} hightlightFirst />
        </div>
      </main>
    </>
  );
}
