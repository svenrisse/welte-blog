import Header from "~/components/Header";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Separator } from "~/components/ui/separator";
import PostActions from "~/components/PostActions";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { TypographyMuted } from "~/components/Typography/TypographyMuted";
import format from "date-fns/format";
import { useQuery } from "@tanstack/react-query";
import client from "tina/__generated__/client";
import { TypographyLead } from "~/components/Typography/TypographyLead";
import PostBadges from "~/components/PostBadges";
import parseISO from "date-fns/parseISO";

export default function CommentPage() {
  const router = useRouter();
  const postName = router.asPath.split("/")[2]!;

  const { data: tinaData } = useQuery({
    queryKey: ["Posts", postName],
    queryFn: async () => {
      const response = await client.queries.post({
        relativePath: `${postName}.md`,
      });
      return response;
    },
  });

  const { data } = api.post.getPostData.useQuery({ postName: postName });

  const date = tinaData && parseISO(tinaData.data.post.createdAt!);

  const formattedDate =
    data &&
    format(
      date!,
      "MMM d" +
        (date!.getFullYear() == new Date().getFullYear() ? "" : ", yyyy"),
    );

  return (
    <>
      <Header active="archive" />
      <main className="mx-auto flex w-full flex-col items-center justify-center gap-6 px-6 py-6 md:w-10/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12">
        <div className="flex flex-col gap-4 self-start">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight md:text-3xl">
            {postName.replace("-", " ")}
          </h1>
          <div className="text-muted-foreground">
            <TypographyLead>{tinaData?.data.post.description}</TypographyLead>
          </div>
          <div className="flex gap-4 px-1">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="h-10 w-10 rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-xs">
              <TypographyMuted>Welte</TypographyMuted>
              <TypographyMuted>{formattedDate}</TypographyMuted>
            </div>
          </div>
          <div className="flex gap-2 self-start">
            <PostBadges tags={tinaData?.data.post.tags} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <Separator />
          <div className="flex justify-start gap-4">
            <PostActions postName={postName} elaborate />
          </div>
          <Separator />
        </div>
      </main>
    </>
  );
}
