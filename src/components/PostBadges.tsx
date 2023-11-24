import Link from "next/link";
import { badgeVariants } from "./ui/badge";
import { type PostConnectionEdges } from "tina/__generated__/types";

export default function PostBadges({ post }: { post: PostConnectionEdges }) {
  return (
    <>
      {post.node?.tags?.slice(0, 2).map((tag) => {
        return (
          <Link
            className={badgeVariants({ variant: "secondary" })}
            href={"/"}
            key={post.node?.id}
          >
            {tag}
          </Link>
        );
      })}
      <Link
        className={badgeVariants({ variant: "outline" })}
        href={`/blog/${post?.node?._sys.filename}`}
      >
        {post.node?.tags?.slice(2).length ? (
          <>{post.node.tags.slice(2).length} more</>
        ) : (
          <>No tags</>
        )}
      </Link>
    </>
  );
}
