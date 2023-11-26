import Header from "~/components/Header";
import { useQuery } from "@tanstack/react-query";
import client from "tina/__generated__/client";
import { Separator } from "~/components/ui/separator";
import PostPreview from "~/components/PostPreview";
import { PostConnectionEdges } from "tina/__generated__/types";

export default function Archive() {
  const { data, isInitialLoading } = useQuery({
    queryKey: ["posts"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const postsResponse = await client.queries.postConnection({});
      return postsResponse;
    },
  });

  const sortedEdges = data?.data?.postConnection?.edges?.sort(function (a, b) {
    if (a!.node!.createdAt! < b!.node!.createdAt!) return 1;
    if (a!.node!.createdAt! > b!.node!.createdAt!) return -1;
    return 0;
  });

  const posts = sortedEdges?.map((post, index) => {
    return (
      <>
        <Separator />
        <PostPreview key={post?.node?.id} post={post as PostConnectionEdges} />
        {index + 1 === sortedEdges.length && <Separator />}
      </>
    );
  });

  return (
    <>
      <Header active="archive" />
      <main className="flex flex-col items-center justify-center">
        <div>{posts}</div>
      </main>
    </>
  );
}
