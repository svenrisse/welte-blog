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

export default function Page() {
  const router = useRouter();
  const slug = router.asPath.split("/")[2];

  const { data } = useQuery({
    queryKey: ["Posts", slug],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await client.queries.post({
        relativePath: `${slug}.md`,
      });
      return response;
    },
  });

  const date = parseISO(data?.data.post.createdAt && data.data.post.createdAt);

  const formattedDate = format(
    date,
    "MMM d" + (date.getFullYear() == new Date().getFullYear() ? "" : ", YYYY"),
  );

  return (
    <>
      <Header active="archive" />
      <main className="flex flex-col items-center justify-center gap-8 px-6 py-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{data?.data.post.title}</h1>
          <p className="text-gray-500">{data?.data.post.description}</p>
          <div className="flex gap-4 px-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-xs">
              <span className="">Welte</span>
              <span className="">{formattedDate}</span>
            </div>
          </div>
        </div>
        <Separator />
        <PostActions />
        <Separator />
        <Image
          src={data?.data.post.heroImage}
          alt={data?.data.post.title}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full rounded-md"
        />
        <div className="prose">
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <TinaMarkdown content={data?.data.post.body} />
        </div>
      </main>
    </>
  );
}
