import { type PostConnectionEdges } from "tina/__generated__/types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Heart, MessageCircle, Share } from "lucide-react";
import format from "date-fns/format";
import { parseISO } from "date-fns";

export default function HeroPost({ post }: { post: PostConnectionEdges }) {
  const date = parseISO(post.node!.createdAt!);
  const formattedDate = format(
    date,
    "MMM d" + (date.getFullYear() == new Date().getFullYear() ? "" : ", YYYY"),
  );

  return (
    <div className="flex w-full flex-col hover:bg-primary-foreground">
      <Link href={`/blog/${post?.node?._sys.filename}`}>
        <div className="">
          <Image
            src={post.node!.heroImage}
            alt={post.node!.title}
            width={0}
            height={0}
            sizes="100vw"
            className="h-60 w-[100vw]"
          />
        </div>
        <div className="flex flex-col gap-4 px-6">
          <h2 className="text-2xl font-semibold">{post?.node?.title}</h2>
          <p className="text-sm text-gray-500">{post?.node?.description}</p>
          <span className="text-sm text-gray-500">{formattedDate}</span>
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
      </Link>
    </div>
  );
}
