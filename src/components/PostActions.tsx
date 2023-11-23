import { Heart, MessageCircle, Share } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import { Post, type PostConnectionEdges } from "tina/__generated__/types";

export default function PostActions({ post }: { post: Post }) {
  const { mutateAsync } = api.post.likePost.useMutation({
    onError() {
      alert("error");
    },
  });

  return (
    <div className="flex w-full justify-between px-1">
      <div className="flex items-center">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => mutateAsync({ postName: post.title })}
        >
          <Heart />
        </Button>
        <span className="font-mono">0</span>
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
