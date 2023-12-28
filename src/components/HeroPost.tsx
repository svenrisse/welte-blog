import { type PostConnectionEdges } from "tina/__generated__/types";
import Link from "next/link";
import Image from "next/image";
import format from "date-fns/format";
import { parseISO } from "date-fns";
import PostActions from "./PostActions";
import PostBadges from "./PostBadges";
import { TypographyH1 } from "./Typography/TypographyH1";
import { TypographyMuted } from "./Typography/TypographyMuted";

export default function HeroPost({ post }: { post: PostConnectionEdges }) {
  const date = parseISO(post.node!.createdAt!);
  const formattedDate = format(
    date,
    "MMM d" + (date.getFullYear() == new Date().getFullYear() ? "" : ", YYYY"),
  );

  return (
    <Link
      href={`/blog/${post?.node?._sys.filename}`}
      className="group flex w-full flex-col rounded-xl hover:bg-primary-foreground md:flex-row md:items-stretch md:px-8 md:py-4 lg:px-4"
    >
      <Image
        src={post.node!.heroImage}
        alt={post.node!.title}
        width={0}
        height={0}
        sizes="100vw"
        className="h-60 w-full md:h-full md:w-6/12 md:rounded-xl"
      />
      <div className="flex flex-col md:w-6/12 md:items-center md:justify-center lg:px-8">
        <div className="flex flex-col px-6 pt-4 md:pt-2 md:text-center lg:px-2">
          <TypographyH1>{post.node?.title}</TypographyH1>
          <div className="py-4 md:py-2 lg:pb-2 2xl:py-6">
            <TypographyMuted>{post.node?.description}</TypographyMuted>
          </div>
          <TypographyMuted>{formattedDate}</TypographyMuted>
        </div>
        <div className="flex gap-2 px-6 py-4 md:py-2 lg:py-3 2xl:py-6">
          <PostBadges post={post} />
        </div>
        <div className="flex justify-between px-6 transition-opacity duration-500 ease-in-out group-hover:opacity-100 md:justify-center md:gap-8 lg:opacity-0">
          <PostActions postName={post.node!._sys.filename} />
        </div>
      </div>
    </Link>
  );
}
