import Header from "~/components/Header";
import { useQuery } from "@tanstack/react-query";
import client from "tina/__generated__/client";
import { Separator } from "~/components/ui/separator";
import PostPreview from "~/components/PostPreview";
import { PostConnectionEdges } from "tina/__generated__/types";
import { Button } from "~/components/ui/button";
import { useState } from "react";

export default function Archive() {
  const [sort, setSort] = useState<"new" | "top">("new");
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
      <main className="mx-auto flex w-full flex-col items-center justify-center md:w-10/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12">
        <div className="flex gap-4 self-start px-6 py-2">
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
        <div className="w-full">{posts}</div>
      </main>
    </>
  );
}
