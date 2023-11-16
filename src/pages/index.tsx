import Head from "next/head";
import Header from "~/components/Header";
import PostList from "~/components/PostList";
import { Separator } from "~/components/ui/separator";

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
        <div>
          <div>
            <h2 className="font-bold">Recommendations</h2>
            <span>View all</span>
          </div>
          <Separator />
        </div>
      </main>
    </>
  );
}
