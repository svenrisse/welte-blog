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
    <div className="flex w-full flex-col px-6 py-4 hover:bg-primary-foreground">
      <Link href={`/blog/${post?.node?._sys.filename}`}>
        <div className="flex justify-between">
          <div className="flex w-8/12 flex-col gap-4">
            <TypographyH3>{post.node?.title}</TypographyH3>
            <TypographyMuted>{post.node?.description}</TypographyMuted>
            <TypographyMuted>{formattedDate}</TypographyMuted>
          </div>
          <div>
            <Image
              src={post.node!.heroImage}
              alt={post.node!.title}
              width={0}
              height={0}
              sizes="100vw"
              className="h-20 w-20 rounded-xl md:h-28 md:w-28 lg:h-32 lg:w-32"
            />
          </div>
        </div>
      </Link>
      <div className="flex gap-2 pb-1 pt-4 lg:pt-2">
        <PostBadges post={post} />
      </div>
      <div className="flex justify-between pt-2">
        <PostActions postName={post.node!._sys.filename} />
      </div>
    </div>
  );
}
