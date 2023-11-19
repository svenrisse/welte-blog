import Link from "next/link";
import Image from "next/image";
import { type RecommendationsConnectionEdges } from "tina/__generated__/types";
export default function Recommendation({
  rec,
  isInitialLoading,
}: {
  rec: RecommendationsConnectionEdges;
  isInitialLoading: boolean;
}) {
  return (
    <Link href={rec?.node ? rec.node.link : ""} key={rec?.node?.id}>
      <div className="flex flex-col py-4">
        <div className="flex items-center gap-4">
          <Image
            src={rec.node!.recImage}
            alt="image"
            width={0}
            height={0}
            sizes="100vw"
            className="h-12 w-12 rounded-xl"
          />
          <h2 className="font-bold">{rec?.node?.heading}</h2>
        </div>
        <div>
          <span>{rec?.node?.description}</span>
        </div>
      </div>
    </Link>
  );
}
