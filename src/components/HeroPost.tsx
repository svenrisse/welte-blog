import { type PostConnectionEdges } from "tina/__generated__/types";
import Link from "next/link";
import Image from "next/image";
import format from "date-fns/format";
import { parseISO } from "date-fns";
import PostActions from "./PostActions";
import PostBadges from "./PostBadges";

export default function HeroPost({ post }: { post: PostConnectionEdges }) {
  const date = parseISO(post.node!.createdAt!);
  const formattedDate = format(
    date,
    "MMM d" + (date.getFullYear() == new Date().getFullYear() ? "" : ", YYYY"),
  );

  return (
    <div className="w-full">
      <Link href={`/blog/${post?.node?._sys.filename}`}>
        <div>
          <Image
            src={post.node!.heroImage}
            alt={post.node!.title}
            width={0}
            height={0}
            sizes="100vw"
            className="h-60 w-full"
          />
        </div>
        <div className="flex flex-col gap-4 px-6 pt-4">
          <h2 className="text-2xl font-semibold">{post?.node?.title}</h2>
          <p className="text-sm text-gray-500">{post?.node?.description}</p>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
      </Link>
      <div className="flex gap-2 px-6 pb-1 pt-4">
        <PostBadges post={post} />
      </div>
      <div className="px-6 pt-4">
        <PostActions postName={post.node!._sys.filename} />
      </div>
    </div>
  );
}
