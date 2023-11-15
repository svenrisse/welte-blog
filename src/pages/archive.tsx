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
      </main>
    </>
  );
}