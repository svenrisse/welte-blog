import { useState } from "react";
import client from "tina/__generated__/client";
import { type PostConnectionEdges } from "tina/__generated__/types";
import PostPreview from "~/components/PostPreview";
import { Button } from "./ui/button";
import { Separator } from "~/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import { Heart, MessageCircle, Share } from "lucide-react";

export default function PostList() {
  const [sort, setSort] = useState<"new" | "top">("new");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data } = useQuery({
    queryKey: ["posts"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      setIsLoading(true);
      const postsResponse = await client.queries.postConnection({});
      setIsLoading(false);
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
        {isLoading ? (
          <div className="flex w-full flex-col hover:bg-primary-foreground">
            <div className="flex justify-between">
              <div className="flex flex-col gap-4">
                <Skeleton className="h-[28px] w-52" />
                <Skeleton className="h-[20px]" />
                <Skeleton className="h-[20px]" />
                <Skeleton className="h-[20px] w-16" />
              </div>
              <div>
                <Skeleton className="h-20 w-20 rounded-xl" />
              </div>
            </div>
            <div className="flex w-full justify-between px-1 pt-6">
              <Button variant={"ghost"} size={"icon"}>
                <Heart />
              </Button>
              <Button variant={"ghost"} size={"icon"}>
                <MessageCircle />
              </Button>
              <Button variant={"ghost"} size={"icon"}>
                <Share />
              </Button>
            </div>
          </div>
        ) : (
          <PostPreview
            key={post?.node?.id}
            post={post as PostConnectionEdges}
            isLoading={isLoading}
          />
        )}
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
