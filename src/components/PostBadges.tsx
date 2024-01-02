import Link from "next/link";
import { badgeVariants } from "./ui/badge";

export default function PostBadges({
  tags,
}: {
  tags: (string | null)[] | null | undefined;
}) {
  return (
    <>
      {tags?.slice(0, 2).map((tag) => {
        return (
          <Link
            className={badgeVariants({ variant: "secondary" })}
            href={"/"}
            key={crypto.randomUUID()}
          >
            {tag}
          </Link>
        );
      })}
      <Link className={badgeVariants({ variant: "outline" })} href={"/"}>
        {tags?.slice(2).length ? (
          <>{tags.slice(2).length} more</>
        ) : (
          <>No tags</>
        )}
      </Link>
    </>
  );
}
