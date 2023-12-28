/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import { signIn, useSession } from "next-auth/react";
import { TypographySmall } from "./Typography/TypographySmall";
import { toast } from "sonner";
import { ShareButton } from "./ShareButton";

type PostActionsProps = {
  postName: string;
  elaborate?: boolean;
};
export default function PostActions({ postName, elaborate }: PostActionsProps) {
  const { data: session } = useSession();
  const utils = api.useUtils();
  const { data } = api.post.getPostData.useQuery(
    {
      postName: postName,
    },
    {},
  );
  const { mutateAsync: likeMutation } = api.post.likePost.useMutation({
    onSuccess() {
      void utils.post.getPostData.invalidate({ postName: postName });
    },
    onError() {
      alert("error");
    },
  });

  const { mutateAsync: unlikeMutation } = api.post.unlikePost.useMutation({
    onSuccess() {
      void utils.post.getPostData.invalidate({ postName: postName });
    },
    onError() {
      alert("error");
    },
  });

  const hasLiked = data && data.Likes.length > 0;

  function handleLikeClick(event: React.SyntheticEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!session) {
      toast.info("Please login to like posts.", {
        action: {
          label: "Login",
          onClick: () => void signIn(),
        },
      });
      return;
    }

    if (hasLiked) {
      void unlikeMutation({
        postId: data.id,
      });
      return;
    }

    void likeMutation({
      postName: postName,
    });
  }
  return (
    <>
      <Button
        variant={elaborate ? "outline" : "ghost"}
        size={"sm"}
        onClick={(event) => handleLikeClick(event)}
        className={elaborate ? "rounded-full" : ""}
      >
        <Heart fill={`${hasLiked ? "red" : ""}`} />
        <div className="ml-2 font-mono">
          <TypographySmall>{data?._count.Likes}</TypographySmall>
        </div>
      </Button>
      <Link href={`/blog/${postName}/comments`}>
        <Button
          variant={elaborate ? "outline" : "ghost"}
          size={"sm"}
          className={elaborate ? "rounded-full" : ""}
        >
          <MessageCircle />
          <div className="ml-2 font-mono">
            <TypographySmall>{data?._count.Comments}</TypographySmall>
          </div>
        </Button>
      </Link>
      <div className={`${elaborate ? "ml-auto" : ""}`}>
        <ShareButton elaborate={elaborate} postName={postName} />
      </div>
    </>
  );
}
