"use client";
import Link from "next/link";
import { Track } from "../types"; 
export default function Share({ track }: {track: Track}) {
  return (
    <div>
      {track.title}
      <Link href={`/track/${track.id}`} className="text-blue-400  hover:text-blue-600">
            {`/track/${track.title}`}
        </Link>
    </div>
  );
}
