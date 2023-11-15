import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import client from "tina/__generated__/client";
import Header from "~/compontents/Header";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { type Query } from "~/types/tina";
import { type PostQuery } from "tina/__generated__/types";

export default function Page() {
  const router = useRouter();
  const slug = router.asPath.split("/")[2];
  const [data, setData] = useState<Query<PostQuery>>();

  useEffect(() => {
    async function getPost() {
      const post = await client.queries.post({
        relativePath: `${slug}.md`,
      });
      setData(post);
    }
    void getPost();
  }, [slug]);

  return (
    <>
      <Header active="about" />
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="prose">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <TinaMarkdown content={data?.data.post.body} />
          </div>
        </div>
      </main>
    </>
  );
}
