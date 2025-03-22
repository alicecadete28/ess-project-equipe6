"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import UserAuthButton from "./ButtonAuthRegister";

export default function AppHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/compass.png"
            alt="DestCINation logo"
            width={48}
            height={48}
          />
          <span className="font-semibold text-xl">
            Dest<span className="text-[#0079c2]">CIN</span>ation
          </span>
        </div>
        <UserAuthButton />
      </div>
    </header>
  );
}
