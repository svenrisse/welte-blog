import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
export default function RecommendationSpinner() {
  return (
    <div className="flex flex-col py-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <Skeleton className="h-[20px] w-10/12" />
      </div>
      <div className="py-2 text-gray-500">
        <Skeleton className="h-[20px] w-10/12" />
      </div>
    </div>
  );
}
