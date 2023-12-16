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
import { TypographyH1 } from "~/components/Typography/TypographyH1";
import { TypographyMuted } from "~/components/Typography/TypographyMuted";
import { TypographyP } from "~/components/Typography/TypographyP";

export default function Page() {
  const router = useRouter();
  const slug = router.asPath.split("/")[2];

  const { data } = useQuery({
    queryKey: ["Posts", slug],
    queryFn: async () => {
      const response = await client.queries.post({
        relativePath: `${slug}.md`,
      });
      return response;
    },
  });

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
      <main className="flex flex-col items-center justify-center gap-6 px-6 py-6">
        <div className="flex flex-col gap-4">
          <TypographyH1>{data?.data.post.title}</TypographyH1>
          <div className="text-muted-foreground">
            <TypographyP>{data?.data.post.description}</TypographyP>
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
          <PostActions postName={slug ? slug : ""} />
          <Separator />
        </div>
        <Image
          src={data?.data.post.heroImage ? data.data.post.heroImage : ""}
          alt={data?.data.post.title ? data.data.post.title : ""}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full rounded-lg"
        />
        <div className="prose prose-neutral dark:prose-invert xl:prose-lg">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <TinaMarkdown content={data?.data.post.body} />
        </div>
      </main>
    </>
  );
}
