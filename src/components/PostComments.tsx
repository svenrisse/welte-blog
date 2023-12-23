import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { UserCircleIcon } from "lucide-react";
import { type RouterOutputs } from "~/utils/api";

type PostCommentsProps = {
  comments: RouterOutputs["post"]["getComments"];
};

export const PostComments = ({ comments }: PostCommentsProps) => {
  const commentElements = comments.map((comment) => {
    return (
      <div key={comment.id}>
        <Avatar>
          {comment.user.image ? (
            <AvatarImage
              src={comment.user.image}
              className="h-16 w-16 rounded-full"
            />
          ) : (
            <AvatarFallback>
              <UserCircleIcon />
            </AvatarFallback>
          )}
        </Avatar>

        <span>{comment.text}</span>
      </div>
    );
  });
  return <div>{commentElements}</div>;
};
