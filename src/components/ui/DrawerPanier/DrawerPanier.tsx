"use client";

import {
  Box,
  Drawer,
  Stack,
  IconButton,
  Typography,
  Divider,
  Button,
  Paper,
} from "@mui/material";

import { usePathname, useRouter } from "next/navigation";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from "@/store/slices/cartSlice";
import Image from "next/image";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";
import { useEffect, useMemo } from "react";

interface DrawerListProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DrawerPanier({ open, setOpen }: DrawerListProps) {
  const Items = useAppSelector(selectCartItems);
  const TotalCard = useAppSelector(selectCartTotal);
  const fallbackImage = "/images/noPhoto.png";
  const dispatch = useAppDispatch();

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  useEffect(() => {
    if (Items.length === 0 && open) {
      const timeout = setTimeout(() => setOpen(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [Items, open, setOpen]);

  const handleIncrease = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.quantity < item.quantityInStock) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
      toast.success("Quantité mise a jour !");
    } else {
      toast.error("Quantité maximale atteinte !");
    }
  };

  const handleDecrease = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
      toast.success("Quantité mise a jour !");
    }
  };

  const handleRemove = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeFromCart(item.id));
    toast.success("Produit supprimé du panier !");
  };

  const DrawerListPage = (
    <Box
      role="presentation"
      onClick={() => setOpen(false)}
      component="div"
      p={2}
      position={"relative"}
      sx={{
        width: { xs: 300, sm: 300, md: 350 },
      }}
    >
      <Stack
        direction={"row"}
        width={"100%"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          Détails de votre panier
        </Typography>
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            backgroundColor: "#c8dcdb",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Stack spacing={3} mt={4}>
        {Items.map((item, index) => (
          <Stack key={index}>
            <Stack direction={"row"} spacing={2}>
              <Image
                alt="coverBook"
                src={item.coverUrl || fallbackImage}
                width={5000}
                height={5000}
                style={{
                  height: "70px",
                  width: "70px",
                  objectFit: "cover",
                }}
                draggable={false}
              />
              <Stack spacing={0.5}>
                <Typography
                  variant="body1"
                  sx={{
                    maxWidth: "250px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    maxWidth: "250px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.description || "Aucune description disponible."}
                </Typography>
                {item.inStock && (
                  <Typography color={"primary.main"} fontSize={14}>
                    En Stock !
                  </Typography>
                )}
                <Stack pt={1}>
                  <Typography color={"#9CA3AF"} fontSize={12}>
                    {item.price} FRCFA
                  </Typography>
                  <Typography fontWeight={"bold"} fontSize={15}>
                    {(item.price * item.quantity).toLocaleString()} FCFA
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
              spacing={1}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={(e) => handleRemove(item, e)}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                Supprimer
              </Button>

              {/* ➕➖ Quantité */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
                spacing={1}
                onClick={stopPropagation}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton
                    onClick={(e) => handleDecrease(item, e)}
                    disabled={item.quantity === 1}
                    sx={{
                      backgroundColor: "#D68B19",
                      width: 32,
                      height: 32,
                      borderRadius: "6px",
                      transition:
                        "opacity 0.2s ease, background-color 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#D68B19",
                        opacity: 0.9,
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#D68B19",
                        opacity: 0.4,
                        color: "white",
                      },
                    }}
                  >
                    <RemoveIcon
                      fontSize="small"
                      sx={{
                        color: "white",
                      }}
                    />
                  </IconButton>
                  <Stack
                    sx={{
                      p: "2px 25px",
                      border: "1px solid #adb5bd",
                    }}
                  >
                    <Typography
                      fontWeight={600}
                      sx={{
                        width: 20,
                        textAlign: "center",
                        userSelect: "none",
                      }}
                    >
                      {item.quantity}
                    </Typography>
                  </Stack>

                  <IconButton
                    onClick={(e) => handleIncrease(item, e)}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "6px",
                      backgroundColor: "primary.main",
                      "&:hover": {
                        backgroundColor: "#D68B19",
                      },
                    }}
                  >
                    <AddIcon fontSize="small" sx={{ color: "white" }} />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
            <Divider sx={{ mt: 1 }} />
          </Stack>
        ))}
      </Stack>
      {TotalCard > 0 && (
        <Paper
          elevation={2}
          sx={{
            position: "sticky",
            bottom: 0,
            p: 2,
            mt: 4,
            backgroundColor: "#fff",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="bold" fontSize={16}>
              Total :
            </Typography>
            <Typography fontWeight="bold" fontSize={17} color="primary.main">
              {TotalCard.toLocaleString()} FCFA
            </Typography>
          </Stack>
          <Button
            variant={"contained"}
            disableElevation
            fullWidth
            sx={{
              color: "white",
              mt: 2,
              padding: "12px 12px",
              backgroundColor: "#D68B19",
            }}
          >
            Passer votre commande
          </Button>
        </Paper>
      )}
    </Box>
  );

  return (
    <Drawer open={open} onClose={() => setOpen(false)} anchor={"right"}>
      {DrawerListPage}
    </Drawer>
  );
}

export default DrawerPanier;
