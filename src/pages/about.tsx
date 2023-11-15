import Header from "~/compontents/Header";
import { type Query } from "~/types/tina";
import { useState, useEffect } from "react";
import client from "tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { type AboutQuery } from "tina/__generated__/types";

export default function About() {
  const [data, setData] = useState<Query<AboutQuery>>();

  useEffect(() => {
    async function getAbout() {
      const about = await client.queries.about({
        relativePath: "about_text.md",
      });
      setData(about);
    }
    void getAbout();
  }, []);

  console.log(data);

  return (
    <>
      <Header active="about" />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="prose">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <TinaMarkdown content={data?.data.about.body} />
          </div>
        </div>
      </main>
    </>
  );
}
