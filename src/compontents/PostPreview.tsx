import { parseISO } from "date-fns";
import Link from "next/link";
import { type PostConnectionEdges } from "tina/__generated__/types";
import format from "date-fns/format";
import Image from "next/image";
import { Heart, MessageCircle, Share } from "lucide-react";
import { Button } from "./ui/button";

export default function PostPreview({ post }: { post: PostConnectionEdges }) {
  const date = parseISO(post.node!.createdAt!);

  const formattedDate = format(
    date,
    "MMM d" + (date.getFullYear() == new Date().getFullYear() ? "" : ", YYYY"),
  );

  const imagePath = post.node?.heroImage;

  return (
    <div className="hover:bg-primary-foreground flex w-full flex-col">
      <Link href={`/blog/${post?.node?._sys.filename}`}>
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">{post?.node?.title}</h2>
            <p className="text-sm text-gray-500">{post?.node?.description}</p>
            <span className="text-sm text-gray-500">{formattedDate}</span>
          </div>
          <div>
            <Image
              src={imagePath!}
              alt="image"
              width={0}
              height={0}
              sizes="100vw"
              className="h-20 w-20 rounded-xl"
            />
          </div>
        </div>
        <div className="flex w-full justify-between px-1 py-3">
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
