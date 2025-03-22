"use client";

import { useState, useRef } from "react";
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
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Eye, EyeOff, Upload, X, FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/service/api";
import StartToastifyInstance from "toastify-js";

export default function RegisterBusinessPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    stars: "",
    cnpj: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    state: "",
    city: "",
    neighborhood: "",
    complement: "",
    password: "",
    confirmPassword: "",
  });

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    router.push("/");
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
        !formData.cnpj ||
        !formData.password
      ) {
        throw new Error("Por favor, preencha todos os campos obrigatórios");
      }

      // In a real app, you would call an API to register the business
      const { email, password, cnpj, cep, phone, ...rest } = formData;
      // Simulate API call
      await api("api/register/pj", {
        body: JSON.stringify({
          user: {
            email,
            password,
          },
          client: {
            cnpj: cnpj.replace(/\D/g, ""),
            cep: cep.replace(/\D/g, ""),
            phone: phone.replace(/\D/g, ""),
            ...rest,
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
    } finally {
      setIsLoading(false);
    }
  };

  // Format CNPJ as user types (XX.XXX.XXX/XXXX-XX)
  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let formatted = digits;

    if (digits.length > 2) {
      formatted = `${digits.substring(0, 2)}.${digits.substring(2)}`;
    }
    if (digits.length > 5) {
      formatted = `${formatted.substring(0, 6)}.${formatted.substring(6)}`;
    }
    if (digits.length > 8) {
      formatted = `${formatted.substring(0, 10)}/${formatted.substring(10)}`;
    }
    if (digits.length > 12) {
      formatted = `${formatted.substring(0, 15)}-${formatted.substring(15)}`;
    }

    return formatted.substring(0, 18);
  };

  // Format phone as user types ((XX) XXXX-XXXX)
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let formatted = digits;

    if (digits.length > 0) {
      formatted = `(${digits.substring(0, 2)}) ${digits.substring(2)}`;
    }
    if (digits.length > 6) {
      formatted = `${formatted.substring(0, 9)}-${formatted.substring(9)}`;
    }

    return formatted.substring(0, 15);
  };

  // Format CEP as user types (XXXXX-XXX)
  const formatCEP = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let formatted = digits;

    if (digits.length > 5) {
      formatted = `${digits.substring(0, 5)}-${digits.substring(5)}`;
    }

    return formatted.substring(0, 9);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <Container maxWidth="md" className="py-8">
        <Paper elevation={6} className="w-[80%] h-[80%] mx-auto p-8 rounded-lg">
          <Typography
            variant="h4"
            component="h1"
            className="font-bold text-gray-800 mb-6"
            sx={{ fontSize: 32, marginBottom: 2 }}
          >
            Cadastro Pessoa Jurídica
          </Typography>

          {error && (
            <Alert severity="error" className="mb-6">
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} className="space-y-4">
            <Grid container spacing={2}>
              {/* Company Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome da Empresa"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={isLoading}
                  required
                  placeholder="Usuário 2"
                />
              </Grid>

              {/* Email and Employees */}
              <Grid item xs={12} sm={8}>
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
                  placeholder="Usuario@gmail.com"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Nº Estrelas"
                  name="stars"
                  type="number"
                  value={formData.stars}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={isLoading}
                  placeholder="3"
                />
              </Grid>

              {/* CNPJ and Phone */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CNPJ"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={(e) => {
                    const formatted = formatCNPJ(e.target.value);
                    setFormData((prev) => ({ ...prev, cnpj: formatted }));
                  }}
                  variant="outlined"
                  disabled={isLoading}
                  required
                  inputProps={{ maxLength: 18 }}
                  placeholder="12.345.678/0001-00"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
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
                  inputProps={{ maxLength: 15 }}
                  placeholder="(81) 3234-9000"
                />
              </Grid>

              {/* CEP and Street */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="CEP"
                  name="cep"
                  value={formData.cep}
                  onChange={(e) => {
                    const formatted = formatCEP(e.target.value);
                    setFormData((prev) => ({ ...prev, cep: formatted }));
                  }}
                  variant="outlined"
                  disabled={isLoading}
                  inputProps={{ maxLength: 9 }}
                  placeholder="50727170"
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Rua"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={isLoading}
                  placeholder="Rua Universidade"
                />
              </Grid>

              {/* Number, State, City */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Número"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={isLoading}
                  placeholder="520"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Estado"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={isLoading}
                  placeholder="PE"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Cidade"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={isLoading}
                  placeholder="Recife"
                />
              </Grid>

              {/* Neighborhood and Complement */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Bairro"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={isLoading}
                  placeholder="Ipitinga"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Complemento"
                  name="complement"
                  value={formData.complement}
                  onChange={handleChange}
                  variant="outlined"
                  disabled={isLoading}
                  placeholder="Complemento"
                />
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="password">Senha</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    placeholder="123445"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Senha"
                  />
                </FormControl>
              </Grid>

              {/* Confirm Password */}
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="confirmPassword">
                    Confirmar Senha
                  </InputLabel>
                  <OutlinedInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    placeholder="••••••••••••••••••"
                    endAdornment={
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
                    }
                    label="Confirmar Senha"
                  />
                </FormControl>
              </Grid>
            </Grid>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 py-2 px-6 normal-case text-base"
              >
                {isLoading ? "Processando..." : "Cadastrar"}
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
