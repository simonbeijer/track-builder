"use client";
import Link from "next/link";
export default function Share({ data }) {
  return (
    <div>
      {data.title}
      <Link href={`/track/${data.id}`} className="text-blue-400  hover:text-blue-600">
            {`/track/${data.title}`}
        </Link>
    </div>
  );
}
