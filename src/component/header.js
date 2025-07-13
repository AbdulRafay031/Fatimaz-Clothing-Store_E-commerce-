// src/component/Header.js
"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <div className="text-xl font-bold">My App</div>

      {status === "authenticated" ? (
        <div className="relative">
          <button
            onClick={() => router.push("/account")}
            className="text-3xl text-blue-600 hover:text-blue-800"
            title="Account"
          >
            <FaUserCircle />
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => router.push("/SignIn")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}
