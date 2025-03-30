"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  UserCircleIcon,
  LogOut,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function UserAuthButton() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Handle menu open
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    handleClose();
    router.push("/");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";

    const nameParts = user.name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();

    return (
      nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
    ).toUpperCase();
  };

  // If not authenticated, show "Create Account" button
  if (!isAuthenticated) {
    return (
      <>
        <Button
          variant="text"
          startIcon={<UserCircleIcon size={20} />}
          className="text-gray-800 normal-case text-sm"
          onClick={handleClick}
          sx={{ fontSize: 12, color: "#333" }}
        >
          Criar conta
        </Button>

        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "user-button",
          }}
          PaperProps={{
            elevation: 3,
            sx: {
              minWidth: 200,
              borderRadius: "8px",
              mt: 1,
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              router.push("/register/pf");
            }}
          >
            <ListItemIcon>
              <User size={18} />
            </ListItemIcon>
            Pessoa Física
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleClose();
              router.push("/register/pj");
            }}
          >
            <ListItemIcon>
              <Settings size={18} />
            </ListItemIcon>
            Pessoa Jurídica
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              router.push("/login");
            }}
          >
            <div className="text-blue-500"> Já tenho uma conta!</div>
          </MenuItem>
        </Menu>
      </>
    );
  }

  // If authenticated, show user profile with dropdown menu
  return (
    <>
      <Button
        onClick={handleClick}
        className="text-gray-800 normal-case"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ textTransform: "none" }}
      >
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "#1976d2",
            fontSize: "0.9rem",
            marginRight: "8px",
          }}
        >
          {getUserInitials()}
        </Avatar>
        <Typography variant="body2" className="hidden sm:block">
          {user?.name || user?.email}
        </Typography>
      </Button>

      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "user-button",
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 200,
            borderRadius: "8px",
            mt: 1,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            router.push("/profile");
          }}
        >
          <ListItemIcon>
            <User size={18} />
          </ListItemIcon>
          Meu Perfil
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose(); //precisa ver ser é pf ou pj
            if (user?.type === "pj") router.push("/manage-reservation/pj");
            else router.push("/manage-reservation/pf");
          }}
        >
          <ListItemIcon>
            <Settings size={18} />
          </ListItemIcon>
          {user?.type == "pf" ? "Minhas Reservas" : "Meus quartos"}
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            router.push("/help");
          }}
        >
          <ListItemIcon>
            <HelpCircle size={18} />
          </ListItemIcon>
          Ajuda
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout} className="text-red-600">
          <ListItemIcon>
            <LogOut size={18} className="text-red-600" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </>
  );
}
