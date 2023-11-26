/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Heart, Loader2, MessageCircle, Share } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { TypographySmall } from "./Typography/TypographySmall";

export default function PostActions({ postName }: { postName: string }) {
  const { data: session } = useSession();
  const utils = api.useUtils();
  const { data, isInitialLoading } = api.post.getPost.useQuery(
    {
      postName: postName,
    },
    {},
  );
  const { mutateAsync: likeMutation } = api.post.likePost.useMutation({
    onSuccess() {
      void utils.post.getPost.invalidate({ postName: postName });
    },
    onError() {
      alert("error");
    },
  });

  const { mutateAsync: unlikeMutation } = api.post.unlikePost.useMutation({
    onSuccess() {
      void utils.post.getPost.invalidate({ postName: postName });
    },
    onError() {
      alert("error");
    },
  });

  const hasLiked = data && data.Like.length > 0;

  data?.Like[0]?.id;

  function handleLikeClick(event: React.SyntheticEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!session) {
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
      <div className="flex items-center">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={(event) => handleLikeClick(event)}
        >
          {isInitialLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Heart fill={`${hasLiked ? "red" : ""}`} />
              <div className="ml-2 font-mono">
                <TypographySmall>{data?._count.Like}</TypographySmall>
              </div>
            </>
          )}
        </Button>
      </div>
      <div className="flex items-center">
        <Button variant={"ghost"} size={"icon"}>
          <>
            <MessageCircle />
            <div className="ml-2 font-mono">
              <TypographySmall>{data?._count.Comment}</TypographySmall>
            </div>
          </>
        </Button>
      </div>
      <Button variant={"ghost"} size={"icon"}>
        <Share />
      </Button>
    </>
  );
}
