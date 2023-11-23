import Header from "~/components/Header";
import PostList from "~/components/PostList";

export default function Archive() {
  return (
    <>
      <Header active="archive" />
      <main className="flex flex-col items-center justify-center">
        <div className="w-full">
          <PostList />
        </div>
      </main>
    </>
  );
}
