import Head from "next/head";
import Link from "next/link";
import Header from "~/components/Header";
import PostList from "~/components/PostList";
import { Separator } from "~/components/ui/separator";
import RecommendationList from "~/components/RecommendationList";

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
        <div className="w-full pb-6">
          <PostList take={8} hightlightFirst />
        </div>
        <div className="w-full px-6 py-6">
          <div className="flex justify-between pb-4">
            <h2 className="font-bold">Recommendations</h2>
            <Link href={"/recommendations"}>
              <span className="hover:underline">View all</span>
            </Link>
          </div>
          <RecommendationList take={3} />
          <Separator />
        </div>
      </main>
    </>
  );
}
