"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Toastify from "toastify-js";
import api from "@/service/api";
import StartToastifyInstance from "toastify-js";

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    router.push("/dashboard");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate form
      if (
        !formData.name ||
        !formData.email ||
        !formData.cpf ||
        !formData.password
      ) {
        throw new Error("Por favor, preencha todos os campos obrigatórios");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("As senhas não coincidem");
      }

      // In a real app, you would call an API to register the user

      // Simulate API call
      await api("api/register/pf", {
        body: JSON.stringify({
          user: {
            email: formData.email,
            password: formData.password,
          },
          client: {
            name: formData.name,
            cpf: formData.cpf.replace(/\D/g, ""),
            birth_date: formData.birthDate,
            phone: formData.phone.replace(/\D/g, ""),
            // favorites: [], não é aqui
            // savedRooms: [],
          },
        }),
        method: "POST",
      });

      // Redirect to login page on success
      StartToastifyInstance({
        duration: 2000,
        text: "Usuário cadastrado com sucesso",
        gravity: "top",
        position: "right",
        className: "bg-green",
      }).showToast();
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta");
      StartToastifyInstance({
        duration: 2000,
        text: err instanceof Error ? err.message : "Erro ao criar conta",
        gravity: "top",
        position: "right",
        className: "bg-red",
      }).showToast();
    } finally {
      setIsLoading(false);
    }
  };

  // Format CPF as user types (XXX.XXX.XXX-XX)
  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let formatted = digits;

    if (digits.length > 3) {
      formatted = `${digits.substring(0, 3)}.${digits.substring(3)}`;
    }
    if (digits.length > 6) {
      formatted = `${formatted.substring(0, 7)}.${formatted.substring(7)}`;
    }
    if (digits.length > 9) {
      formatted = `${formatted.substring(0, 11)}-${formatted.substring(
        11,
        13
      )}`;
    }

    return formatted.substring(0, 14);
  };

  // Format phone as user types ((XX) XXXXX-XXXX)
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let formatted = digits;

    if (digits.length > 2) {
      formatted = `(${digits.substring(0, 2)}) ${digits.substring(2)}`;
    }
    if (digits.length > 7) {
      formatted = `${formatted.substring(0, 10)}-${formatted.substring(10)}`;
    }

    return formatted.substring(0, 16);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <Container maxWidth="sm" className="py-8">
        <Paper elevation={6} className="w-full p-8 rounded-full">
          <Typography
            variant="h4"
            component="h1"
            className="font-bold text-gray-800 mb-10"
            sx={{ marginBottom: 2, fontSize: 32 }}
          >
            Cadastro Pessoa Física
          </Typography>

          {error && (
            <Alert severity="error" className="mb-6">
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              disabled={isLoading}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                disabled={isLoading}
                required
              />

              <TextField
                fullWidth
                label="Data Nascimento"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                variant="outlined"
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={(e) => {
                  const formatted = formatCPF(e.target.value);
                  setFormData((prev) => ({ ...prev, cpf: formatted }));
                }}
                variant="outlined"
                disabled={isLoading}
                required
                inputProps={{ maxLength: 14 }}
              />

              <TextField
                fullWidth
                label="Telefone"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);
                  setFormData((prev) => ({ ...prev, phone: formatted }));
                }}
                variant="outlined"
                disabled={isLoading}
                inputProps={{ maxLength: 16 }}
              />
            </div>

            <TextField
              fullWidth
              label="Senha"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              disabled={isLoading}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirmação senha"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              disabled={isLoading}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div className="pt-4">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 py-3 normal-case text-base"
              >
                {isLoading ? "Processando..." : "Criar Conta"}
              </Button>
            </div>

            <div className="text-center mt-4">
              <Typography variant="body2" className="text-gray-600">
                Já possui uma conta?{" "}
                <Button
                  variant="text"
                  onClick={() => router.push("/")}
                  className="p-0 min-w-0 normal-case text-blue-600 font-medium"
                >
                  Faça login
                </Button>
              </Typography>
            </div>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
