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
    <Link href={`/blog/${post?.node?._sys.filename}`}>
      <div className="flex w-full flex-col md:flex-row md:items-stretch md:px-8 md:pb-2 md:pt-4 lg:px-52">
        <Image
          src={post.node!.heroImage}
          alt={post.node!.title}
          width={0}
          height={0}
          sizes="100vw"
          className="h-60 w-full md:h-full md:w-6/12 md:rounded-xl"
        />
        <div className="flex flex-col md:w-6/12 md:items-center md:justify-center lg:px-8">
          <div className="flex flex-col px-6 pt-4 md:pt-2 md:text-center">
            <h2 className="text-2xl font-semibold lg:text-3xl">
              {post?.node?.title}
            </h2>
            <p className="py-4 text-sm text-gray-500 md:py-2 lg:text-base">
              {post?.node?.description}
            </p>
            <span className="text-sm text-gray-500">{formattedDate}</span>
          </div>
          <div className="flex gap-2 px-6 py-4 md:py-2">
            <PostBadges post={post} />
          </div>
          <div className="flex justify-between px-6 md:justify-center md:gap-8">
            <PostActions postName={post.node!._sys.filename} />
          </div>
        </div>
      </div>
    </Link>
  );
}
