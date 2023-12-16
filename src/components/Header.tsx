import { Plus, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserDropDown } from "./UserDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { TypographyH2 } from "./Typography/TypographyH2";

export default function Header({
  active,
}: {
  active: "home" | "archive" | "about";
}) {
  const { status, data } = useSession();
  return (
    <header className="flex flex-col border-b">
      <div className="flex lg:justify-between">
        <div className="flex items-center gap-3 px-2 py-2 md:px-6 md:py-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <TypographyH2>Weltpinion</TypographyH2>
        </div>
        <nav className="hidden justify-evenly px-2 pt-2 md:pt-0 lg:flex lg:w-1/3 lg:self-end">
          <Link
            href={"/"}
            className={`${
              active === "home" && "rounded-none border-b-2 border-primary"
            } w-1/3`}
          >
            <Button variant={"ghost"} className="w-full">
              Home
            </Button>
          </Link>
          <Link
            href={"/archive"}
            className={`${
              active === "archive" && "rounded-none border-b-2 border-primary"
            } w-1/3`}
          >
            <Button variant={"ghost"} className="w-full">
              Archive
            </Button>
          </Link>
          <Link
            href={"/about"}
            className={`${
              active === "about" && "rounded-none border-b-2 border-primary"
            } w-1/3`}
          >
            <Button variant={"ghost"} className="w-full">
              About
            </Button>
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 px-4 md:gap-4 md:px-6 lg:ml-0">
          <ThemeToggle />
          {status === "unauthenticated" ? (
            <Button onClick={() => signIn()}>Sign in</Button>
          ) : (
            <UserDropDown />
          )}
        </div>
      </div>
      <nav className="flex justify-evenly px-2 pt-2 md:pt-0 lg:hidden">
        <Link
          href={"/"}
          className={`${
            active === "home" && "rounded-none border-b-2 border-primary"
          } w-1/3 md:w-1/4`}
        >
          <Button variant={"ghost"} className="w-full">
            Home
          </Button>
        </Link>
        <Link
          href={"/archive"}
          className={`${
            active === "archive" && "rounded-none border-b-2 border-primary"
          } w-1/3 md:w-1/4`}
        >
          <Button variant={"ghost"} className="w-full">
            Archive
          </Button>
        </Link>
        <Link
          href={"/about"}
          className={`${
            active === "about" && "rounded-none border-b-2 border-primary"
          } w-1/3 md:w-1/4`}
        >
          <Button variant={"ghost"} className="w-full">
            About
          </Button>
        </Link>
      </nav>
    </header>
  );
}
