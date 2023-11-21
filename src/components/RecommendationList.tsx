import { useQuery } from "@tanstack/react-query";
import client from "tina/__generated__/client";
import { Separator } from "~/components/ui/separator";
import Recommendation from "~/components/Recommendation";
import { type RecommendationsConnectionEdges } from "tina/__generated__/types";

type response = {
  recommendationsConnection: {
    edges: RecommendationsConnectionEdges[];
  };
};
export default function RecommendationList({ take }: { take?: number }) {
  const { data } = useQuery({
    queryKey: ["recs"],
    refetchOnWindowFocus: false,
    queryFn: async (): Promise<response> => {
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
      return response.data as response;
    },
  });

  console.log(data);

  const recs = data?.recommendationsConnection.edges.map((edge, index) => {
    return (
      <>
        <Separator />
        <Recommendation rec={edge} />
        {index + 1 === data.recommendationsConnection.edges?.length && (
          <Separator />
        )}
      </>
    );
  });

  return <div className="w-full px-6">{recs}</div>;
}
