import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Heart, Share, MessageCircle } from "lucide-react";
export default function PostPreviewSpinner() {
  return (
    <>
      <div className="flex w-full flex-col hover:bg-primary-foreground">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-[28px] w-52" />
            <Skeleton className="h-[20px]" />
            <Skeleton className="h-[20px]" />
            <Skeleton className="h-[20px] w-16" />
          </div>
          <div>
            <Skeleton className="h-20 w-20 rounded-xl" />
          </div>
        </div>
        <div className="flex w-full justify-between px-1 pt-6">
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
      </div>
    </>
  );
}
