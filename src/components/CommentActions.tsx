import { Heart, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { TypographySmall } from "./Typography/TypographySmall";
import { ShareButton } from "./ShareButton";
import { Textarea } from "./ui/textarea";
import { UserCircleIcon } from "lucide-react";
import { Avatar } from "~/components/ui/avatar";
import { AvatarImage } from "~/components/ui/avatar";
import { AvatarFallback } from "~/components/ui/avatar";
import { useState } from "react";
import { object, string } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { type Session } from "next-auth";

type CommentActionsProps = {
  postName: string;
  session: Session | null;
};

const commentSchema = object({
  text: string({ required_error: "Text is required" }).min(3).max(250),
});

export default function CommentActions({
  postName,
  session,
}: CommentActionsProps) {
  const [reply, setReply] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      commentSchema.parse({ text });
    } catch (e) {
      toast.error("Comment must be between 3 and 250 characters long.");
      return;
    }
    toast.promise(mutateAsync({ postName: slug, text: text }), {
      loading: "Loading...",
      success: () => {
        return "Comment has been posted.";
      },
      error: "Error",
    });
    setText("");
  };

  if (reply) {
    return (
      <div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex w-full flex-col gap-4"
        >
          <div className="flex w-full gap-4">
            <Avatar>
              {session?.user.image ? (
                <AvatarImage src={session.user.image} />
              ) : (
                <AvatarFallback>
                  <UserCircleIcon />
                </AvatarFallback>
              )}
            </Avatar>
            <Textarea
              placeholder="Write a comment..."
              id="comment"
              onChange={(e) => setText(e.target.value)}
              value={text}
              minLength={3}
              maxLength={250}
            />
          </div>
          <div className="self-end">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit">Post</Button>
            )}
          </div>
        </form>
      </div>
    );
  }
  return (
    <>
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={(event) => console.log(event)}
        className="px-0"
      >
        <Heart fill={``} />
        <div className="ml-2 font-mono">
          <TypographySmall>{0}</TypographySmall>
        </div>
      </Button>
      <Button
        variant={"ghost"}
        size={"sm"}
        className="px-0"
        onClick={() => setReply(true)}
      >
        <MessageCircle />
        <div className="ml-2 font-mono">
          <TypographySmall>{0}</TypographySmall>
        </div>
      </Button>
      <div>
        <ShareButton url={``} removePadding />
      </div>
    </>
  );
}
