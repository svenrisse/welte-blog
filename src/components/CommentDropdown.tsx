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

type CommentDropdownProps = {
  userIsOrig: boolean;
};

export const CommentDropdown = ({ userIsOrig }: CommentDropdownProps) => {
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
              <DropdownMenuItem className="gap-4">
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
