import Header from "~/components/Header";
import client from "tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "~/components/ui/skeleton";

export default function About() {
  const { data, isInitialLoading } = useQuery({
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
        <div className="flex w-full flex-col items-center justify-center px-4 py-8">
          {isInitialLoading ? (
            <div className="w-full py-10">
              <Skeleton className="h-10 w-10/12 rounded-full" />
              <div className="flex flex-col gap-4 py-8">
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6 w-8/12" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6" />
                <Skeleton className="h-6 w-4/12" />
              </div>
            </div>
          ) : (
            <div className="prose prose-neutral dark:prose-invert">
              {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
              <TinaMarkdown content={data?.data.about.body} />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
