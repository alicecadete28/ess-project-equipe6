"use client";

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import UserAuthButton from "./ButtonAuthRegister";
import { useAuth } from "@/hooks/useAuth";
import { use } from "react";

export default function AppHeader() {
  const { user } = useAuth();
  console.log(user);
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

        <div className="flex items-center gap-4">
          {user?.client?.cnpj && (
            <Button component={Link} href="/accommodation">
              Publicar Acomodação
            </Button>
          )}
          <UserAuthButton />
        </div>
      </div>
    </header>
  );
}
