"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-red-500">
      <Link href="/home">
        <h1 className="text-6xl md:text-5xl font-extrabold cursor-pointer">
          <span className="text-red-500">Quadra</span>
          <span className="text-blue-500">Cart</span>
        </h1>
      </Link>
    </div>
  );
}