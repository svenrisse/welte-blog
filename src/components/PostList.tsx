import { useEffect, useState } from "react";
import client from "tina/__generated__/client";
import {
  type PostConnectionEdges,
  type PostConnectionQuery,
} from "tina/__generated__/types";
import PostPreview from "~/components/PostPreview";
import { Button } from "./ui/button";

export default function PostList() {
  const [data, setData] = useState<PostConnectionQuery>();
  const [sort, setSort] = useState<"new" | "top">("new");

  useEffect(() => {
    async function getPosts() {
      const postsResponse = await client.queries.postConnection({});
      setData(postsResponse.data);
    }
    void getPosts();
  }, []);

  const sortedEdges = data?.postConnection.edges?.sort(function (a, b) {
    if (a!.node!.createdAt! < b!.node!.createdAt!) return 1;
    if (a!.node!.createdAt! > b!.node!.createdAt!) return -1;
    return 0;
  });

  const posts = sortedEdges?.map((post) => {
    return (
      <PostPreview
        key={post?.node?.id}
        post={post as PostConnectionEdges}
        image={post!.node!.heroImage.slice(1)}
      />
    );
  });

  return (
    <div>
      <div className="flex gap-4 pb-4">
        <Button
          variant={`${sort === "new" ? "secondary" : "ghost"}`}
          onClick={() => setSort("new")}
        >
          New
        </Button>
        <Button
          variant={`${sort === "top" ? "secondary" : "ghost"}`}
          onClick={() => setSort("top")}
        >
          Top
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-12">
        {posts}
      </div>
    </div>
  );
}
