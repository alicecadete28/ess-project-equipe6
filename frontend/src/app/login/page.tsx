"use client";

import type React from "react";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.push("/");
  }, [isAuthenticated]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen ">
      <Container
        maxWidth="sm"
        className="flex items-center justify-center min-h-[calc(100vh-64px)]"
      >
        <Paper elevation={3} className="w-full p-10 pt-24 pb-24 rounded-full">
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="space-y-6 flex flex-col items-center"
          >
            <div className="text-left  mb-6">
              <Typography
                variant="h4"
                component="h1"
                className="font-bold text-[#333]-700"
                fontSize={32}
              >
                Aproveite nossa plataforma
              </Typography>
              <Typography variant="body1" className=" text-[#333]-600">
                Faça <span className="font-bold">login</span> para acessar
                nossas ofertas ou gerenciar suas acomodações
              </Typography>
            </div>

            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />

            <TextField
              fullWidth
              label="Senha"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-6"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              className="bg-blue-600 w-[80%]  hover:bg-blue-700 py-3 normal-case text-base "
              loading={isLoading}
            >
              Entrar
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
