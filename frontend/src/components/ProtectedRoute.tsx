import { ReactNode, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth"; // Exemplo de hook de autenticação
import LoadingScreen from "./Loading";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth(); // Seu hook personalizado de auth

  const router = useRouter();

  useLayoutEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push("login"); // Redireciona para login se não estiver autenticado
    }
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) return <LoadingScreen />; // Enquanto verifica autenticação

  return children;
}
