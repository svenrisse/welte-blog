import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { UserCircleIcon } from "lucide-react";
import { type RouterOutputs } from "~/utils/api";
import format from "date-fns/format";
import { TypographyMuted } from "./Typography/TypographyMuted";
import { Typography } from "./Typography/Typography";
import { TypographySmall } from "./Typography/TypographySmall";
import { Separator } from "~/components/ui/separator";

type PostCommentsProps = {
  comments: RouterOutputs["post"]["getComments"];
};

export const PostComments = ({ comments }: PostCommentsProps) => {
  const commentElements = comments.map((comment) => {
    const date = comment.createdAt as Date;
    const formattedDate =
      comments &&
      format(
        date,
        "MMM d" +
          (date.getFullYear() == new Date().getFullYear() ? "" : ", YYYY"),
      );

    return (
      <div key={comment.id} className="flex gap-4 py-6 first:pt-0">
        <div className="flex flex-col items-center gap-2">
          <Avatar>
            {comment.user.image ? (
              <AvatarImage
                src={comment.user.image}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <AvatarFallback>
                <UserCircleIcon />
              </AvatarFallback>
            )}
          </Avatar>
          <Separator orientation="vertical" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <Typography>{comment.user.name}</Typography>
            <TypographyMuted>{formattedDate}</TypographyMuted>
          </div>
          <TypographySmall>{comment.text}</TypographySmall>
        </div>
      </div>
    );
  });
  return <>{commentElements}</>;
};
