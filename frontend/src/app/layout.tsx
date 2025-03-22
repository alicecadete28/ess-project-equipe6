import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import Image from "next/image";
import { ReactNode } from "react";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/auth";
import AppHeader from "@/components/Header";

export const metadata: Metadata = {
  title: "DestCINation - Encontre sua próxima estadia",
  description: "Encontre ofertas de hoteis para sua próxima viagem",
};

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AppHeader />
            <div className="-mt-20">{children}</div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
