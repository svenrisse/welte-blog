/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Heart, Loader2, MessageCircle, Share } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "~/utils/api";

export default function PostActions({ postName }: { postName: string }) {
  const { data, isLoading } = api.post.getLikes.useQuery({
    postName: postName,
  });
  const { mutateAsync } = api.post.likePost.useMutation({
    onSuccess() {
      alert("succes");
    },
    onError() {
      alert("error");
    },
  });

  const hasLiked = data?.Like.length;

  return (
    <div className="flex w-full justify-between px-1">
      <div className="flex items-center">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => mutateAsync({ postName: postName })}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Heart fill={`${hasLiked ? "red" : "white"}`} />
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
    </div>
  );
}