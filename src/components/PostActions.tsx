import { Heart, MessageCircle, Share } from "lucide-react";
import { Button } from "./ui/button";

export default function PostActions() {
  return (
    <div className="flex w-full justify-between px-1">
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
  );
}
