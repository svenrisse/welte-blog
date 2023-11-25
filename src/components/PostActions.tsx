/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Heart, Loader2, MessageCircle, Share } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

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

  function handleLikeClick() {
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
          onClick={() => handleLikeClick()}
        >
          {isInitialLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Heart fill={`${hasLiked ? "red" : ""}`} />
              <span className="ml-2 font-mono">{data?._count.Like}</span>
            </>
          )}
        </Button>
      </div>
      <div className="flex items-center">
        <Button variant={"ghost"} size={"icon"}>
          <MessageCircle />
        </Button>
        <span className="font-mono">0</span>
      </div>
      <Button variant={"ghost"} size={"icon"}>
        <Share />
      </Button>
    </>
  );
}
