import Image from "next/image";
import Header from "~/compontents/Header";
import PostList from "~/compontents/PostList";

export default function Archive() {
  return (
    <>
      <Header active="archive" />
      <main className="flex flex-col items-center justify-center">
        <div className="w-full px-6 py-6">
          <PostList />
        </div>
        <Image
          src={`/41j06n.png`}
          alt="image"
          width={0}
          height={0}
          sizes="100vw"
          className="h-20 w-20 rounded-xl"
        />
      </main>
    </>
  );
}
