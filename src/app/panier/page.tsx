"use client";

import {
  Box,
  Breadcrumbs,
  Button,
  IconButton,
  Link as MUILink,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from "@/store/slices/cartSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Icon } from "@iconify/react";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import { usePathname, useRouter } from "next/navigation";
import { BounceLoader } from "react-spinners";
import NextLink from "next/link";

function Page() {
  const Items = useAppSelector(selectCartItems);
  const TotalCard = useAppSelector(selectCartTotal);
  const fallbackImage = "/images/noPhoto.png";
  const dispatch = useAppDispatch();
  const { setLoadPage } = usePageLoader();
  const pathname = usePathname();
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<{
    id: string | null;
    type: "increase" | "decrease" | "remove" | null;
  }>({ id: null, type: null });
  const [infosLoadPage, setInfosLoadPage] = useState<{
    load: boolean;
    exist: boolean | null;
  }>({ load: true, exist: null });

  useEffect(() => {
    if (Items.length > 0) {
      setInfosLoadPage((prevState) => ({
        ...prevState,
        load: false,
        exist: true,
      }));
    } else {
      setInfosLoadPage({
        load: false,
        exist: false,
      });
    }
  }, [Items]);

  const handleIncrease = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAction({ id: item.id, type: "increase" });
    if (item.quantity < item.quantityInStock) {
      setTimeout(() => {
        setLoadingAction({ id: null, type: null });
        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
        toast.success("Quantité mise a jour !");
      }, 2000);
    } else {
      setTimeout(() => {
        setLoadingAction({ id: null, type: null });
        toast.error("Quantité maximale atteinte !");
      }, 2000);
    }
  };

  const handleDecrease = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAction({ id: item.id, type: "decrease" });
    if (item.quantity > 1) {
      setTimeout(() => {
        setLoadingAction({ id: null, type: null });
        dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
        toast.success("Quantité mise a jour !");
      }, 2000);
    }
  };

  const handleRemove = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadingAction({ id: item.id, type: "remove" });
    setTimeout(() => {
      setLoadingAction({ id: null, type: null });
      dispatch(removeFromCart(item.id));
      toast.success("Produit supprimé du panier !");
    }, 2000);
  };

  const breadcrumbs = [
    <MUILink
      key="1"
      component={NextLink}
      href="/"
      onClick={(e) => {
        e.preventDefault();
        if (pathname !== "/") {
          setLoadPage(true);
          router.push("/");
        }
      }}
      underline="none"
      fontSize={14}
      sx={{
        color: "#757575",
        "&:hover": {
          color: "primary.main",
          textDecoration: "underline",
        },
      }}
    >
      Accueil
    </MUILink>,
    <MUILink
      key="1"
      component={NextLink}
      href="/panier"
      onClick={(e) => {
        e.preventDefault();
        if (pathname !== "/panier") {
          setLoadPage(true);
          router.push("/panier");
        }
      }}
      underline="none"
      fontSize={14}
      sx={{
        color: "#757575",
        "&:hover": {
          color: "primary.main",
          textDecoration: "underline",
        },
      }}
    >
      Panier
    </MUILink>,
  ];

  return (
    <PageContainer>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{
          fontSize: "0.95rem",

          marginTop: { xs: 6.5, sm: 2 },
        }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Stack sx={{ mt: "15px" }}>
        {infosLoadPage.load && infosLoadPage.exist === null ? (
          <Stack alignItems={"center"}>
            <BounceLoader color="#D68B19" loading size={35} />
          </Stack>
        ) : !infosLoadPage.load && infosLoadPage.exist ? (
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 12, md: 8 }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Détails de votre panier
              </Typography>
              {Items.map((item: any) => {
                const isLoadingThisItem = loadingAction.id === item.id;
                return (
                  <Stack spacing={2} mt={2} key={item.id}>
                    <Paper
                      elevation={0}
                      key={item.id}
                      sx={{
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        p: 4,
                        display: "flex",
                        gap: 2,
                      }}
                    >
                      <Stack spacing={2}>
                        <Image
                          alt="coverBook"
                          src={item.coverUrl || fallbackImage}
                          width={5000}
                          height={5000}
                          style={{
                            height: "90px",
                            width: "90px",
                            objectFit: "cover",
                          }}
                          draggable={false}
                        />

                        <Button
                          variant="outlined"
                          size={"small"}
                          color="error"
                          onClick={(e) => handleRemove(item, e)}
                          sx={{
                            textTransform: "none",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: 500,
                            pointerEvents: isLoadingThisItem ? "none" : "auto",
                            display: { xs: "flex", sm: "flex", md: "none" },
                          }}
                        >
                          {isLoadingThisItem &&
                          loadingAction.type === "remove" ? (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <BounceLoader color="#D68B19" loading size={24} />
                            </Box>
                          ) : (
                            <Typography fontSize={14}>Supprimer</Typography>
                          )}
                        </Button>
                      </Stack>
                      <Stack
                        spacing={2}
                        direction={"row"}
                        justifyContent={"space-between"}
                        width={"100%"}
                      >
                        <Stack width={"100%"} spacing={4}>
                          <Stack
                            width={"100%"}
                            sx={{
                              display: "flex",
                              flexDirection: {
                                xs: "column",
                                sm: "column",
                                md: "column",
                                lg: "row",
                              },
                              justifyContent: "space-between",
                            }}
                          >
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
                                  maxWidth: "450px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",

                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {item.description ||
                                  "Aucune description disponible."}
                              </Typography>
                              {item.inStock && (
                                <Typography
                                  color={"primary.main"}
                                  fontSize={14}
                                >
                                  En Stock !
                                </Typography>
                              )}
                            </Stack>
                            <Stack
                              alignSelf={{
                                xs: "end",
                                sm: "end",
                                md: "end",
                                lg: "start",
                              }}
                            >
                              <Typography color={"#9CA3AF"} fontSize={12}>
                                {item.price} FRCFA
                              </Typography>
                              <Typography fontWeight={"bold"} fontSize={16}>
                                {(item.price * item.quantity).toLocaleString()}{" "}
                                FCFA
                              </Typography>
                            </Stack>
                          </Stack>

                          <Stack
                            width={"100%"}
                            justifyContent={"space-between"}
                            direction={"row"}
                            alignItems={"center"}
                          >
                            <Button
                              variant="outlined"
                              size={"small"}
                              color="error"
                              onClick={(e) => handleRemove(item, e)}
                              sx={{
                                textTransform: "none",
                                pointerEvents: isLoadingThisItem
                                  ? "none"
                                  : "auto",
                                borderRadius: "8px",
                                fontSize: "13px",
                                fontWeight: 500,
                                display: { xs: "none", sm: "none", md: "flex" },
                              }}
                            >
                              {isLoadingThisItem &&
                              loadingAction.type === "remove" ? (
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                >
                                  <BounceLoader
                                    color="#D68B19"
                                    loading
                                    size={24}
                                  />
                                </Box>
                              ) : (
                                <Typography fontSize={14}>Supprimer</Typography>
                              )}
                            </Button>
                            <Stack />
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <IconButton
                                onClick={(e) => handleDecrease(item, e)}
                                disabled={item.quantity === 1}
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: "6px",
                                  transition:
                                    "opacity 0.2s ease, background-color 0.2s ease",
                                  pointerEvents: isLoadingThisItem
                                    ? "none"
                                    : "auto",
                                  backgroundColor:
                                    loadingAction.id === item.id &&
                                    loadingAction.type === "decrease"
                                      ? "transparent"
                                      : "#D68B19",
                                  "&:hover": {
                                    backgroundColor:
                                      loadingAction.id === item.id &&
                                      loadingAction.type === "decrease"
                                        ? "transparent"
                                        : "#D68B19",
                                    opacity: 0.9,
                                  },
                                  "&.Mui-disabled": {
                                    backgroundColor: "#D68B19",
                                    opacity: 0.4,
                                    color: "white",
                                  },
                                }}
                              >
                                {isLoadingThisItem &&
                                loadingAction.type === "decrease" ? (
                                  <BounceLoader
                                    color="#D68B19"
                                    loading
                                    size={25}
                                  />
                                ) : (
                                  <RemoveIcon
                                    fontSize="small"
                                    sx={{ color: "white" }}
                                  />
                                )}
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
                                  pointerEvents: isLoadingThisItem
                                    ? "none"
                                    : "auto",
                                  backgroundColor:
                                    loadingAction.id === item.id &&
                                    loadingAction.type === "increase"
                                      ? "transparent"
                                      : "#D68B19",
                                  "&:hover": {
                                    backgroundColor:
                                      loadingAction.id === item.id &&
                                      loadingAction.type === "increase"
                                        ? "transparent"
                                        : "#D68B19",
                                  },
                                }}
                              >
                                {isLoadingThisItem &&
                                loadingAction.type === "increase" ? (
                                  <BounceLoader
                                    color="#D68B19"
                                    loading
                                    size={25}
                                  />
                                ) : (
                                  <AddIcon
                                    fontSize="small"
                                    sx={{ color: "white" }}
                                  />
                                )}
                              </IconButton>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Paper>
                  </Stack>
                );
              })}
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 18,
                  display: { xs: "none", sm: "none", md: "flex" },
                }}
              >
                Résumé de la commande
              </Typography>
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
                  <Typography fontWeight="bold" fontSize={25}>
                    Total :
                  </Typography>
                  <Typography
                    fontWeight="bold"
                    fontSize={25}
                    color="primary.main"
                  >
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
                  <Typography fontSize={15}>Passer votre commande</Typography>
                </Button>
              </Paper>
              <Stack
                direction={"row"}
                spacing={0.5}
                mt={2}
                sx={{
                  display: { xs: "none", sm: "none", md: "flex" },
                }}
              >
                <Icon
                  icon="mdi:secure-outline"
                  width="20"
                  height="20"
                  style={{ color: "black" }}
                />
                <Typography>Paiement sécurisé</Typography>
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Stack spacing={10}>
              <Stack alignItems={"center"} spacing={2}>
                <Typography fontWeight={"bold"} fontSize={20}>
                  Votre panier est vide!
                </Typography>
                <Image
                  alt="coverBook"
                  src={"/images/emptyCard.png"}
                  width={5000}
                  height={5000}
                  style={{
                    height: "70px",
                    width: "70px",
                    objectFit: "cover",
                  }}
                  draggable={false}
                />
              </Stack>
              <Stack alignItems={"center"} spacing={1}>
                <Typography>Continuez vos achats sur Edusite</Typography>
                <Button
                  sx={{
                    fontWeight: "normal",
                  }}
                  onClick={() => {
                    if (pathname !== "/") {
                      router.push("/");
                      setLoadPage(true);
                    }
                  }}
                >
                  <Typography>Retour à la page d'accueil</Typography>
                </Button>
              </Stack>
            </Stack>
          </Paper>
        )}
      </Stack>
    </PageContainer>
  );
}

export default Page;
