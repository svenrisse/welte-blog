import { useQuery } from "@tanstack/react-query";
import client from "tina/__generated__/client";
import { Separator } from "~/components/ui/separator";
import Recommendation from "~/components/Recommendation";
import { type RecommendationsConnectionEdges } from "tina/__generated__/types";

export default function RecommendationList({ take }: { take?: number }) {
  const { data } = useQuery({
    queryKey: ["recs"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await client.request({
        query: `{
          recommendationsConnection {
            edges {
              node {
              heading
              description
              recImage
              link
              }
            }
          }
        }`,
      });
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

  return <div className="w-full px-6"></div>;
}
