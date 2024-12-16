"use client";
import Link from "next/link";
export default function Home() {
  return (
    <div
      className="h-full w-full flex justify-center items-center flex-col"
      style={{ backgroundColor: "var(--color-blue)" }}
    >
      <h1 className="p-4">Welcome to track builder</h1>
      <p>
        Track builder is a tool to add you musical contrubution to a existing
        track
      </p>
      <p>Share a link to a track and find you new musical partner</p>
      <p>Save contrubution to the site and get feedback</p>
      <div className="flex row">
        <div className="p-8">
          <Link href={"/upload"}>GET STARTED</Link>
        </div>
        {/* <Link href={"/upload"}>INFO</Link> */}
      </div>
    </div>
  );
}
