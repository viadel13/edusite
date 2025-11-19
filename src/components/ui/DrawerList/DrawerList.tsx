"use client";

import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Drawer,
  Stack,
  Button,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { pages } from "@/constants/links";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import CloseIcon from "@mui/icons-material/Close";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCategories,
  selectLoadingCatetogeries,
} from "@/store/slices/booksSlice";
import React, { useEffect, useState } from "react";
import { fetchCategories } from "@/store/slices/booksThunks";
import { useAuth } from "@/contexts/AuthContext";

interface DrawerListProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onLoginClick: () => void;
}

function DrawerList({ open, setOpen, onLoginClick }: DrawerListProps) {
  const pathname = usePathname(),
    router = useRouter(),
    { setLoadPage } = usePageLoader();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectLoadingCatetogeries);
  const { user, logout } = useAuth();
  const [pendingLogout, setPendingLogout] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAuthCta = async () => {
    if (user) {
      try {
        setPendingLogout(true);
        await logout();
      } catch (error) {
        console.error("Erreur lors de la déconnexion", error);
      } finally {
        setPendingLogout(false);
      }
    } else {
      setOpen(false);
      onLoginClick();
    }
  };

  const DrawerListPage = (
    <Box
      sx={{ width: { xs: 320, sm: 350 } }}
      role="presentation"
      onClick={() => setOpen(false)}
      component="div"
    >
      <Stack
        px={2}
        py={3}
        direction={"row"}
        width={"100%"}
        justifyContent="space-between"
        alignItems={"center"}
        sx={{
          backgroundColor: "rgb(245,249,245)",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Icon
            icon="mingcute:user-4-fill"
            width="35"
            height="35"
            style={{ color: "black" }}
          />
          <Box>
            <Typography fontSize={20} fontWeight={600} lineHeight={1.2}>
              {user ? `Salut, ${user.name}` : "Salut,"}
            </Typography>
            {user?.email && (
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            )}
          </Box>

          <Button
            variant={"contained"}
            disableElevation
            size={"small"}
            disabled={pendingLogout}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              textTransform: "none",
              transition: "all 0.3s ease",
              px: "8px",
              minWidth: 120,
              "&:hover": {
                backgroundColor: "transparent",
                color: "black",
                textDecoration: "underline",
                boxShadow: "none",
              },
            }}
            onClick={handleAuthCta}
          >
            <Typography
              sx={{
                color: "inherit",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {pendingLogout ? (
                <CircularProgress size={16} sx={{ color: "inherit" }} />
              ) : null}
              {user ? "Déconnexion" : "Connexion"}
            </Typography>
          </Button>
        </Stack>
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 300,
          px: 2,
          mt: 4,
          fontSize: { xs: "1.7rem", sm: "1.7rem", md: "1.8rem" },
          letterSpacing: "0.05em",
        }}
      >
        Categories
      </Typography>
      {loading ? (
        <Stack alignItems="center" justifyContent="center" py={3}>
          <CircularProgress />
        </Stack>
      ) : (
        <List disablePadding>
          {categories.map((cat) => (
            <Stack key={cat.id}>
              <ListItemButton
                sx={{
                  py: 1.5,
                  px: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight={500}>
                      {cat.name.toUpperCase()}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Stack>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      {DrawerListPage}
    </Drawer>
  );
}

export default DrawerList;
