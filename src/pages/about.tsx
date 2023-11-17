import Header from "~/components/Header";
import client from "tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useQuery } from "@tanstack/react-query";

export default function About() {
  const { data } = useQuery({
    queryKey: ["about"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const about = await client.queries.about({
        relativePath: "about_text.md",
      });
      return about;
    },
  });
  return (
    <>
      <Header active="about" />
      <main className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center px-4 py-8">
          <div className="prose">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <TinaMarkdown content={data?.data.about.body} />
          </div>
        </div>
      </main>
    </>
  );
}
