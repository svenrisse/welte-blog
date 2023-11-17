import Head from "next/head";
import Header from "~/components/Header";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import client from "tina/__generated__/client";
import Image from "next/image";

export default function Recommendations() {
  const { data } = useQuery({
    queryKey: ["posts"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await client.queries.recommendationsConnection({});
      return response;
    },
  });

  const recs = data?.data.recommendationsConnection.edges?.map((rec) => {
    return (
      <Link href={rec?.node ? rec.node.link : ""} key={rec?.node?.id}>
        <div>
          <div>
            <Image
              src={rec!.node!.recImage}
              alt="image"
              width={0}
              height={0}
              sizes="100vw"
              className="h-20 w-20 rounded-xl"
            />
          </div>
          <h2>{rec?.node?.heading}</h2>
          <span>{rec?.node?.description}</span>
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
        <div className="w-full px-6 py-6">{recs}</div>
      </main>
    </>
  );
}
