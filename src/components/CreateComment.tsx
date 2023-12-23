import { api } from "~/utils/api";
import { UserCircleIcon } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Avatar } from "~/components/ui/avatar";
import { AvatarImage } from "~/components/ui/avatar";
import { AvatarFallback } from "~/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { object, string } from "zod";

const commentSchema = object({
  text: string({ required_error: "Text is required" }).min(3).max(250),
});

type CreateCommentProps = {
  slug: string;
};

export const CreateComment = ({ slug }: CreateCommentProps) => {
  const { data: session } = useSession();
  const utils = api.useUtils();

  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const { mutateAsync } = api.post.addComment.useMutation({
    onSettled: () => {
      void utils.post.getComments.invalidate({ postName: slug });
      void utils.post.getPost.invalidate({ postName: slug });
    },
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      commentSchema.parse({ text });
    } catch (e) {
      setError(true);
      return;
    }
    await mutateAsync({
      text: text,
      postName: slug,
    });
    setText("");
  };

  return (
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
          required
          minLength={3}
          maxLength={250}
        />
      </div>
      <div className="self-end">
        <Button type="submit">Post</Button>
      </div>
    </form>
  );
};
