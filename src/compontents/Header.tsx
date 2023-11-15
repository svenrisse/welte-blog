import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header({
  active,
}: {
  active: "home" | "archive" | "about";
}) {
  return (
    <header className="border-b">
      <div className="flex">
        <div className="flex items-center gap-3 px-2 py-2 md:px-6 md:py-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="font-bold md:text-2xl">Weltpinion</h2>
        </div>
        <div className="ml-auto flex items-center md:gap-4 md:px-6">
          <Button className="bg-teal-600">
            <Plus className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
          <Button variant={"ghost"}>Sign in</Button>
        </div>
      </div>
      <nav className="flex w-full justify-evenly px-2 pt-2 md:pt-0">
        <Link
          href={"/"}
          className={`${
            active === "home" && "rounded-none border-b-2 border-teal-600"
          } w-1/3`}
        >
          <Button variant={"ghost"} className="w-full">
            Home
          </Button>
        </Link>
        <Link
          href={"/archive"}
          className={`${
            active === "archive" && "rounded-none border-b-2 border-teal-600"
          } w-1/3`}
        >
          <Button variant={"ghost"} className="w-full">
            Archive
          </Button>
        </Link>
        <Link
          href={"/about"}
          className={`${
            active === "about" && "rounded-none border-b-2 border-teal-600"
          } w-1/3`}
        >
          <Button variant={"ghost"} className="w-full">
            About
          </Button>
        </Link>
      </nav>
    </header>
  );
}
