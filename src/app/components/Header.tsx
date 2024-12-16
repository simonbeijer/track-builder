"use client"
import Link from "next/link";
export default function Header() {
    return (
        <header
        className="h-12"
        style={{
          backgroundColor: "var(--foreground)",
          color: "var(--text)",
        }}
      >
        <Link href={`/`} className="text-blue-400  hover:text-blue-600">
        HEADER 
        </Link>
      </header>
    )
}