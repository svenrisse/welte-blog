import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { UserCircleIcon } from "lucide-react";

type PostCommentsProps = {
  comments: {
    id: number;
    postId: number;
    userId: string;
    text: string;
    user: {
      id: string;
      name: string | null;
      email: string | null;
      emailVerified: Date | null;
      image: string | null;
    };
  }[];
};

export const PostComments = ({ comments }: PostCommentsProps) => {
  const commentElements = comments.map((comment) => {
    return (
      <div key={comment.id}>
        <Avatar>
          {comment.user.image ? (
            <AvatarImage src={comment.user.image} />
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
