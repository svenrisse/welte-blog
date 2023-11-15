import Header from "~/compontents/Header";

export default function Archive() {
  return (
    <>
      <Header active="archive" />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 "></div>
      </main>
    </>
  );
}
