import Header from "~/compontents/Header";

export default function About() {
  return (
    <>
      <Header active="about" />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 "></div>
      </main>
    </>
  );
}
