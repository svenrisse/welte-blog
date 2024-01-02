import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { UserCircleIcon } from "lucide-react";
import format from "date-fns/format";
import { TypographyMuted } from "./Typography/TypographyMuted";
import { Typography } from "./Typography/Typography";
import { TypographySmall } from "./Typography/TypographySmall";
import { CommentDropdown } from "./CommentDropdown";
import CommentActions from "./CommentActions";
import { type Session } from "next-auth";
import { Router } from "next/router";
import { RouterOutputs } from "~/utils/api";
import { CommentLike } from "@prisma/client";

type Comment = {
  user: {
    id: string;
    name: string;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
  };
  id: string;
  postId: string;
  userId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  originalCommentId: string | null;
  Responses: Comment[];
  CommentLikes: CommentLike[];
  _count: {
    CommentLikes: number;
    Responses: number;
  };
};

type PostCommentsProps = {
  postName: string;
  session: Session | null;
  comment: Comment;
  liked: boolean;
};

export const Comment = ({
  comment,
  postName,
  session,
  liked,
}: PostCommentsProps) => {
  const date = comment.createdAt;
  const formattedDate = format(
    date,
    "MMM d" + (date.getFullYear() == new Date().getFullYear() ? "" : ", yyyy"),
  );

  const responses = comment.Responses?.map((response) => {
    return (
      <Comment
        key={response.id}
        postName={postName}
        session={session}
        comment={response}
        liked={response.CommentLikes.length > 0}
      />
    );
  });

  return (
    <div key={comment.id} className="flex gap-4 first:pt-0">
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
        <div className="h-[100%] w-px bg-muted"></div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2 rounded-lg px-2 hover:cursor-pointer hover:bg-primary-foreground">
          <div className="flex items-center gap-4">
            <Typography>{comment.user.name}</Typography>
            <TypographyMuted>{formattedDate}</TypographyMuted>
            <div className="ml-auto">
              <CommentDropdown
                userIsOrig={session?.user.id === comment.userId}
                userRole={session?.user.role}
                commentId={comment.id}
                postName={postName}
              />
            </div>
          </div>
          <TypographySmall>{comment.text}</TypographySmall>
          <div className="flex gap-6 pt-2">
            <CommentActions
              session={session}
              commentId={comment.id}
              postName={postName}
              count={comment._count}
              liked={liked}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">{responses}</div>
      </div>
    </div>
  );
};
