import Head from "next/head";
import Header from "~/components/Header";
import RecommendationList from "~/components/RecommendationList";

export default function Recommendations() {
  return (
    <>
      <Head>
        <title>Weltpinion</title>
        <meta name="description" content="Weltpinion | Blog by Welte" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header active="home" />
      <main className="flex flex-col items-center justify-center">
        <h1 className="py-10 text-xl font-bold">Recommendations by me</h1>
        <div className="flex w-full flex-col items-center px-4 md:w-8/12 lg:w-6/12 xl:w-4/12 2xl:w-3/12">
          <RecommendationList />
        </div>
      </main>
    </>
  );
}
