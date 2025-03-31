"use client";

import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import UserAuthButton from "./ButtonAuthRegister";
import { useAuth } from "@/hooks/useAuth";

export default function AppHeader() {
  const { user } = useAuth();
  console.log(user);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/compass.png"
              alt="DestCINation logo"
              width={48}
              height={48}
            />
            <span className="font-semibold text-xl">
              Dest<span className="text-[#0079c2]">CIN</span>ation
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user?.client?.cnpj && (
            <Button component={Link} href="/(home)">
              Publicar Acomodação
            </Button>
          )}
          <UserAuthButton />
        </div>
      </div>
    </header>
  );
}
