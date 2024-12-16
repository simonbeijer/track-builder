"use client"
import { ReactNode } from "react";

type buttonProps = {
  onClick?: () => void
  children?: ReactNode,
  className?: String,
  type?: "button" | "submit" | "reset";
}

export default function Button({ onClick, children, className, type = "button" }: buttonProps) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 ${className}`}
        type={type}
      >
        {children}
      </button>
    );
  }
  