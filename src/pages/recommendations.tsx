import Head from "next/head";
import Header from "~/components/Header";
import { useQuery } from "@tanstack/react-query";
import client from "tina/__generated__/client";
import { Separator } from "~/components/ui/separator";
import Recommendation from "~/components/Recommendation";
import { type RecommendationsConnectionEdges } from "tina/__generated__/types";

export default function Recommendations() {
  const { data } = useQuery({
    queryKey: ["posts"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await client.queries.recommendationsConnection({});
      return response;
    },
  });

  const recs = data?.data?.recommendationsConnection?.edges?.map(
    (rec, index) => {
      return (
        <>
          <Separator />
          <Recommendation rec={rec as RecommendationsConnectionEdges} />
          {index + 1 === data?.data.recommendationsConnection.edges?.length && (
            <Separator />
          )}
        </>
      );
    },
  );

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
        <div className="w-full px-6">{recs}</div>
      </main>
    </>
  );
}
