import { api } from "~/utils/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Flag, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";

type CommentDropdownProps = {
  userIsOrig: boolean;
  commentId: string;
  postName: string;
};

export const CommentDropdown = ({
  userIsOrig,
  commentId,
  postName,
}: CommentDropdownProps) => {
  const utils = api.useUtils();
  const { mutateAsync } = api.post.deleteComment.useMutation({
    onSuccess: () => {
      void utils.post.getComments.invalidate({ postName: postName });
      void utils.post.getPostData.invalidate({ postName: postName });
    },
  });

  const handleDeleteClick = () => {
    toast.promise(mutateAsync({ commentId: commentId }), {
      loading: "Loading...",
      success: () => {
        return "Comment deleted.";
      },
      error: "Something went wrong.",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="rounded-full p-2" asChild>
          <MoreHorizontal size={"2rem"} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {userIsOrig && (
            <>
              <DropdownMenuItem
                className="gap-4"
                onClick={() => handleDeleteClick()}
              >
                <Trash2 size={"1.25rem"} />
                <span>Delete Comment</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem className="gap-4">
            <Flag size={"1.25rem"} />
            <span>Report Comment</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
