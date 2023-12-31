import { useState } from "react";
import client from "tina/__generated__/client";
import { type PostConnectionEdges } from "tina/__generated__/types";
import PostPreview from "~/components/PostPreview";
import { Button } from "./ui/button";
import { Separator } from "~/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import PostPreviewSpinner from "./PostPreviewSpinner";
import { times } from "lodash";
import HeroPost from "./HeroPost";
import { Skeleton } from "./ui/skeleton";
import RecommendationList from "~/components/RecommendationList";
import Link from "next/link";
import { Heart, MessageCircle, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { TypographyH2 } from "./Typography/TypographyH2";
import { TypographySmall } from "./Typography/TypographySmall";
import { TypographyH3 } from "./Typography/TypographyH3";
import { TypographyMuted } from "./Typography/TypographyMuted";

export default function Home({
  take,
  hightlightFirst,
}: {
  take?: number;
  hightlightFirst?: boolean;
}) {
  const [sort, setSort] = useState<"new" | "top">("new");

  const { data, isInitialLoading } = useQuery({
    queryKey: ["posts"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const postsResponse = await client.queries.postConnection({
        first: take ? take : undefined,
      });
      return postsResponse;
    },
  });

  const sortedEdges = data?.data?.postConnection?.edges?.sort(function (a, b) {
    if (a!.node!.createdAt! < b!.node!.createdAt!) return 1;
    if (a!.node!.createdAt! > b!.node!.createdAt!) return -1;
    return 0;
  });

  const posts = sortedEdges?.slice(hightlightFirst ? 1 : 0).map((post) => {
    return (
      <>
        <PostPreview key={post?.node?.id} post={post as PostConnectionEdges} />
        <Separator />
      </>
    );
  });

  return (
    <div
      className={`${!hightlightFirst && "pt-6"} flex flex-col lg:items-center`}
    >
      {hightlightFirst && (
        <>
          <div className="pb-4 lg:w-8/12 xl:w-6/12">
            {isInitialLoading ? (
              <>
                <Skeleton className="h-60 w-full rounded-none" />
                <div className="flex flex-col gap-4 px-6 pt-4">
                  <Skeleton className="h-[32px] w-10/12" />
                  <Skeleton className="h-[20px] w-full" />
                  <Skeleton className="h-[20px] w-8/12" />
                  <Skeleton className="h-[20px] w-2/12" />
                </div>
                <div className="flex w-full justify-between px-6 pt-4">
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
              </>
            ) : (
              <>
                {sortedEdges && (
                  <HeroPost post={sortedEdges[0] as PostConnectionEdges} />
                )}
              </>
            )}
          </div>
          <Separator />
        </>
      )}
      <div className="flex flex-col items-center pt-4 md:flex-row md:items-start md:justify-between md:gap-6 md:px-6 lg:w-8/12 lg:gap-8 lg:px-4 xl:w-6/12 xl:px-0">
        <div className="w-full md:w-7/12 lg:w-8/12">
          <div className="flex gap-4 px-6 py-2">
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
          <div className="flex flex-col items-center justify-center">
            {isInitialLoading ? (
              <>
                {times(5, (index) => (
                  <>
                    <Separator />
                    <PostPreviewSpinner />
                    {index + 1 === 5 && <Separator />}
                  </>
                ))}
              </>
            ) : (
              <>{posts}</>
            )}
          </div>
        </div>
        <div className="w-10/12 py-6 md:w-4/12 md:py-0 lg:w-4/12">
          <div className="hidden md:flex md:flex-col md:gap-4 md:pb-8">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <TypographyH3>Weltpinion</TypographyH3>
              <TypographyMuted>Cringe-Posts & other stuff</TypographyMuted>
            </div>
            <div className="flex gap-4">
              <Input type="email" placeholder="Email" />
              <Button type="submit" disabled>
                Subscribe
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between pb-4">
            <TypographyH3>Recommendations</TypographyH3>
            <Link href={"/recommendations"} className="hover:underline">
              <TypographySmall>View all</TypographySmall>
            </Link>
          </div>
          <RecommendationList take={3} />
          <Separator />
        </div>
      </div>
    </div>
  );
}
