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
    <header className="flex flex-col border-b">
      <div className="flex lg:justify-between">
        <div className="flex items-center gap-3 px-2 py-2 md:px-6 md:py-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="font-bold md:text-2xl">Weltpinion</h2>
        </div>
        <nav className="hidden justify-evenly px-2 pt-2 md:pt-0 lg:flex lg:w-1/3 lg:self-end">
          <Link
            href={"/"}
            className={`${
              active === "home" && "border-primary rounded-none border-b-2"
            } w-1/3`}
          >
            <Button variant={"ghost"} className="w-full">
              Home
            </Button>
          </Link>
          <Link
            href={"/archive"}
            className={`${
              active === "archive" && "border-primary rounded-none border-b-2"
            } w-1/3`}
          >
            <Button variant={"ghost"} className="w-full">
              Archive
            </Button>
          </Link>
          <Link
            href={"/about"}
            className={`${
              active === "about" && "border-primary rounded-none border-b-2"
            } w-1/3`}
          >
            <Button variant={"ghost"} className="w-full">
              About
            </Button>
          </Link>
        </nav>
        <div className="ml-auto flex items-center md:gap-4 md:px-6 lg:ml-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
          <Button variant={"ghost"}>Sign in</Button>
        </div>
      </div>
      <nav className="flex justify-evenly px-2 pt-2 md:pt-0 lg:hidden">
        <Link
          href={"/"}
          className={`${
            active === "home" && "border-primary rounded-none border-b-2"
          } w-1/3`}
        >
          <Button variant={"ghost"} className="w-full">
            Home
          </Button>
        </Link>
        <Link
          href={"/archive"}
          className={`${
            active === "archive" && "border-primary rounded-none border-b-2"
          } w-1/3`}
        >
          <Button variant={"ghost"} className="w-full">
            Archive
          </Button>
        </Link>
        <Link
          href={"/about"}
          className={`${
            active === "about" && "border-primary rounded-none border-b-2"
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
