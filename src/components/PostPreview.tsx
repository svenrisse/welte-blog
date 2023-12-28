import { parseISO } from "date-fns";
import Link from "next/link";
import { type PostConnectionEdges } from "tina/__generated__/types";
import format from "date-fns/format";
import Image from "next/image";
import PostActions from "./PostActions";
import PostBadges from "./PostBadges";
import { TypographyH3 } from "./Typography/TypographyH3";
import { TypographyMuted } from "./Typography/TypographyMuted";

export default function PostPreview({ post }: { post: PostConnectionEdges }) {
  const date = parseISO(post.node!.createdAt!);

  const formattedDate = format(
    date,
    "MMM d" + (date.getFullYear() == new Date().getFullYear() ? "" : ", YYYY"),
  );

  return (
    <div className="group flex w-full flex-col px-6 py-4 hover:bg-primary-foreground">
      <Link href={`/blog/${post?.node?._sys.filename}`}>
        <div className="flex justify-between">
          <div className="flex w-8/12 flex-col gap-4">
            <TypographyH3>{post.node?.title}</TypographyH3>
            <TypographyMuted>{post.node?.description}</TypographyMuted>
            <TypographyMuted>{formattedDate}</TypographyMuted>
            <div className="flex gap-2 pb-1 lg:pt-2">
              <PostBadges post={post} />
            </div>
            <div className="hidden justify-between pt-2 transition-opacity duration-500 ease-in-out group-hover:opacity-100 md:flex lg:opacity-0">
              <PostActions postName={post.node!._sys.filename} />
            </div>
          </div>
          <div className="flex w-4/12 justify-center">
            <Image
              src={post.node!.heroImage}
              alt={post.node!.title}
              width={0}
              height={0}
              sizes="100vw"
              className="h-28 w-32 rounded-xl md:h-32 md:w-32 lg:h-40 lg:w-40 xl:h-40 xl:w-48"
            />
          </div>
        </div>
      </Link>
      <div className="flex justify-between pt-2 md:hidden">
        <PostActions postName={post.node!._sys.filename} />
      </div>
    </div>
  );
}
