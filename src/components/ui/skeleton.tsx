import { cn } from "src/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-full bg-gray-200", className)}
      {...props}
    />
  );
}

export { Skeleton };
