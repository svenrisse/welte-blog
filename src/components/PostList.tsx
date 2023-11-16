import { useState } from "react";
import client from "tina/__generated__/client";
import { type PostConnectionEdges } from "tina/__generated__/types";
import PostPreview from "~/components/PostPreview";
import { Button } from "./ui/button";
import { Separator } from "~/components/ui/separator";
import { useQuery } from "@tanstack/react-query";

export default function PostList() {
  const [sort, setSort] = useState<"new" | "top">("new");

  const { data } = useQuery({
    queryKey: ["posts"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const postsResponse = await client.queries.postConnection({});
      return postsResponse;
    },
  });

  const sortedEdges = data?.data.postConnection.edges?.sort(function (a, b) {
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
    <div>
      <div className="flex gap-4 pb-4">
        <Button
          variant={`${sort === "new" ? "secondary" : "ghost"}`}
          onClick={() => setSort("new")}
        >
          New
        </Button>
        <Button
          variant={`${sort === "top" ? "secondary" : "ghost"}`}
          onClick={() => setSort("top")}
        >
          Top
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        {posts}
      </div>
    </div>
  );
}
