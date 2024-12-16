"use client";
import React from 'react'
interface cardProps {
  children: React.ReactNode;
}
export default function Card({ children }: cardProps) {
  return <div className="m-2 p-2 flex bg-black shadow-custom rounded-md">{children}</div>;
}
