import { useRouter } from "next/router";
import client from "tina/__generated__/client";
import Header from "~/components/Header";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "~/components/ui/avatar";
import { AvatarImage } from "~/components/ui/avatar";
import { AvatarFallback } from "~/components/ui/avatar";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import { Separator } from "~/components/ui/separator";
import PostActions from "~/components/PostActions";
import { TypographyMuted } from "~/components/Typography/TypographyMuted";
import { TypographyLead } from "~/components/Typography/TypographyLead";
import { TypographyH3 } from "~/components/Typography/TypographyH3";
import { api } from "~/utils/api";
import { PostComments } from "~/components/PostComments";
import { CreateComment } from "~/components/CreateComment";

export default function Page() {
  const router = useRouter();
  const slug = router.asPath.split("/")[2]!;

  const { data } = useQuery({
    queryKey: ["Posts", slug],
    queryFn: async () => {
      const response = await client.queries.post({
        relativePath: `${slug}.md`,
      });
      return response;
    },
  });

  const { data: comments } = api.post.getComments.useQuery({ postName: slug! });

  const date = data && parseISO(data.data.post.createdAt!);

  const formattedDate =
    data &&
    format(
      date!,
      "MMM d" +
        (date!.getFullYear() == new Date().getFullYear() ? "" : ", YYYY"),
    );

  return (
    <>
      <Header active="archive" />
      <main className="mx-auto flex w-full flex-col items-center justify-center gap-6 px-6 py-6 md:w-10/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12">
        <div className="flex flex-col gap-4 self-start">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight md:text-3xl">
            {data?.data.post.title}
          </h1>
          <div className="text-muted-foreground">
            <TypographyLead>{data?.data.post.description}</TypographyLead>
          </div>
          <div className="flex gap-4 px-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-xs">
              <TypographyMuted>Welte</TypographyMuted>
              <TypographyMuted>{formattedDate}</TypographyMuted>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Separator />
          <div className="flex justify-between px-6">
            <PostActions postName={slug} />
          </div>
          <Separator />
        </div>
        <Image
          src={data?.data.post.heroImage ? data.data.post.heroImage : ""}
          alt={data?.data.post.title ? data.data.post.title : ""}
          width={0}
          height={0}
          sizes="100vw"
          className="h-60 w-full rounded-lg md:aspect-video md:h-auto"
        />
        <div className="prose prose-neutral max-w-none xl:prose-lg dark:prose-invert">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <TinaMarkdown content={data?.data.post.body} />
        </div>
        <Separator />
        <div className="self-start">
          <TypographyH3>
            {comments?.length} {comments?.length === 1 ? "Comment" : "Comments"}
          </TypographyH3>
        </div>
        <CreateComment slug={slug} />
        <div className="flex flex-col gap-8 self-start pb-8">
          {comments && <PostComments comments={comments} />}
        </div>
      </main>
    </>
  );
}
