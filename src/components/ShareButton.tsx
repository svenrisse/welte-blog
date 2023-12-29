import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import { TypographyMuted } from "./Typography/TypographyMuted";
import { Button } from "./ui/button";
import { Clipboard, Facebook, Mail, Share, Twitter } from "lucide-react";
import { Typography } from "./Typography/Typography";
import { FaReddit, FaWhatsapp } from "react-icons/fa";
import { Separator } from "./ui/separator";
import { useMediaQuery } from "usehooks-ts";

type ShareButtonProps = {
  elaborate?: boolean;
  removePadding?: boolean;
  url: string;
};

export const ShareButton = ({
  elaborate,
  url,
  removePadding,
}: ShareButtonProps) => {
  const isDesktop = useMediaQuery("(min-width: 800px)");

  if (isDesktop) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={elaborate ? "outline" : "ghost"}
            size={"sm"}
            className={`${elaborate ? "rounded-full" : ""} ${
              removePadding ? "px-0" : ""
            }`}
          >
            {elaborate ? <TypographyMuted>Share</TypographyMuted> : <Share />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Share</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <TwitterShareButton url={url} className="flex gap-4">
                <Twitter />
                <Typography>Share to Twitter</Typography>
              </TwitterShareButton>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RedditShareButton url={url} className="flex gap-4">
                <FaReddit size={"1.5rem"} />
                <Typography>Share to Reddit</Typography>
              </RedditShareButton>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FacebookShareButton url={url} className="flex gap-4">
                <Facebook />
                <Typography>Share to Facebook</Typography>
              </FacebookShareButton>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <WhatsappShareButton url={url} className="flex gap-4">
                <FaWhatsapp size={"1.5rem"} />
                <Typography>Share to WhatsApp</Typography>
              </WhatsappShareButton>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <EmailShareButton url={url} className="flex gap-4">
                <Mail />
                <Typography>Send as email</Typography>
              </EmailShareButton>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                className="flex gap-4"
                onClick={() => navigator.clipboard.writeText(url)}
              >
                <Clipboard />
                <Typography>Copy link</Typography>
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant={elaborate ? "outline" : "ghost"}
          size={"sm"}
          className={elaborate ? "rounded-full" : ""}
        >
          {elaborate ? <TypographyMuted>Share</TypographyMuted> : <Share />}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Share</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-4 p-4 pb-0 font-sans">
            <TwitterShareButton url={url} className="flex gap-4">
              <Twitter />
              <Typography>Share to Twitter</Typography>
            </TwitterShareButton>
            <RedditShareButton url={url} className="flex gap-4">
              <FaReddit size={"1.5rem"} />
              <Typography>Share to Reddit</Typography>
            </RedditShareButton>
            <FacebookShareButton url={url} className="flex gap-4">
              <Facebook />
              <Typography>Share to Facebook</Typography>
            </FacebookShareButton>
            <WhatsappShareButton url={url} className="flex gap-4">
              <FaWhatsapp size={"1.5rem"} />
              <Typography>Share to WhatsApp</Typography>
            </WhatsappShareButton>
            <Separator />
            <EmailShareButton url={url} className="flex gap-4">
              <Mail />
              <Typography>Send as email</Typography>
            </EmailShareButton>
            <button
              className="flex gap-4"
              onClick={() => navigator.clipboard.writeText(url)}
            >
              <Clipboard />
              <Typography>Copy link</Typography>
            </button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
