import { Skeleton } from "./ui/skeleton";
export default function RecommendationSpinner() {
  return (
    <div className="flex flex-col py-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <Skeleton className="h-[24px] w-6/12" />
      </div>
      <div className="flex flex-col gap-2 py-2 text-gray-500">
        <Skeleton className="h-[24px] w-full" />
        <Skeleton className="h-[24px] w-full" />
        <Skeleton className="h-[24px] w-3/12" />
      </div>
    </div>
  );
}
