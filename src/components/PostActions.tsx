import { Heart, MessageCircle, Share } from "lucide-react";
import { Button } from "./ui/button";

export default function PostActions() {
  return (
    <div className="flex w-full justify-between px-1">
      <div className="flex items-center">
        <Button variant={"ghost"} size={"icon"}>
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
