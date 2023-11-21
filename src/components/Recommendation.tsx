import Link from "next/link";
import Image from "next/image";
import { type RecommendationsConnectionEdges } from "tina/__generated__/types";

export default function Recommendation({
  rec,
}: {
  rec: RecommendationsConnectionEdges;
}) {
  return (
    <Link href={rec?.node ? rec.node.link : ""} key={rec?.node?.id}>
      <div className="flex flex-col py-4">
        <div className="flex items-center gap-3">
          <Image
            src={rec.node!.recImage}
            alt="image"
            width={0}
            height={0}
            sizes="100vw"
            className="h-12 w-12 rounded-lg"
          />
          <h2 className="font-bold">{rec?.node?.heading}</h2>
        </div>
        <div className="py-2 text-gray-500">
          <span>{rec?.node?.description}</span>
        </div>
      </div>
    </Link>
  );
}
