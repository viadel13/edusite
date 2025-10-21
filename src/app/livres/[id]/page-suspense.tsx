"use client";

import {
  Breadcrumbs,
  Stack,
  Typography,
  Link as MUILink,
  Paper,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchBookById } from "@/store/slices/booksThunks";
import NextLink from "next/link";
import {
  selectBookById,
  selectLoadingBookById,
} from "@/store/slices/booksSlice";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import Grid from "@mui/material/Grid";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import Image from "next/image";
import DetailsImagesSwipper from "@/components/ui/swipper/DetailsImagesSwiper/DetailsImagesSwipper";
import ZoomImage from "@/components/ui/ZoomImage/ZoomImage";
import { Icon } from "@iconify/react";
import { useAddToCart } from "@/hooks/useAddToCart";
import DrawerPanier from "@/components/ui/DrawerPanier/DrawerPanier";
import toast from "react-hot-toast";
import { setLoadItemsClick } from "@/store/slices/cartSlice";

function SuspendedBookDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const book = useAppSelector(selectBookById);
  const loading = useAppSelector(selectLoadingBookById);
  const { setLoadPage } = usePageLoader();
  const pathname = usePathname();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loadButtonAdd, setLoadButtonAdd] = useState(false);
  const { handleAddToCart, loadingAction, animateId, showPlusId } =
    useAddToCart();

  useEffect(() => {
    if (id) dispatch(fetchBookById(id));
  }, [dispatch, id]);

  const handleSelectImage = (url: string) => {
    setActiveImage(url);
  };

  function addCard() {
    setLoadButtonAdd(true);
    handleAddToCart(currentBook, () => setOpen(true));
    setTimeout(() => {
      setLoadButtonAdd(false);
    }, 2000);
  }

  const currentBook = Array.isArray(book) ? book[0] : book;

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

    <Typography
      key="2"
      fontSize={14}
      sx={{
        color: "#757575",

        "&:hover": {
          color: "primary.main",
        },
      }}
    >
      Livres
    </Typography>,

    <Typography
      key="3"
      fontSize={14}
      sx={{
        textTransform: "capitalize",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: " 100%",
        maxWidth: {
          xs: "200px",
          sm: "400px",
          md: "640px",
          lg: "800px",
        },
      }}
    >
      {currentBook?.description || "Détails du livre"}
    </Typography>,
  ];

  return (
    <>
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
          {loading && (
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                p: 4,
              }}
            >
              <CircularProgress size={35} />
            </Stack>
          )}

          {!loading && !currentBook && (
            <Typography style={{ color: "red" }}>
              ❌ Le livre que vous recherchez n’existe pas ou a été supprimé.
            </Typography>
          )}

          {!loading && currentBook && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 5, lg: 4 }}>
                <ZoomImage
                  src={activeImage || currentBook.coverUrl}
                  alt="Livre"
                />
                <Stack>
                  {currentBook?.othersImagesUrl?.length ? (
                    <DetailsImagesSwipper
                      othersImagesUrl={currentBook.othersImagesUrl}
                      onSelectImage={handleSelectImage}
                    />
                  ) : null}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 7, lg: 8 }}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "2px",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 4,
                  }}
                >
                  <Stack>
                    {/* 🏷️ Titre et auteur */}
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ color: "#333" }}
                    >
                      {currentBook.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#555", fontStyle: "italic" }}
                    >
                      par{" "}
                      {Array.isArray(currentBook.author)
                        ? currentBook.author.join(", ")
                        : currentBook.author}
                    </Typography>

                    {/* ✍️ Description */}
                    <Typography
                      variant="body1"
                      sx={{ mt: 2, color: "#444", lineHeight: 1.7 }}
                    >
                      {currentBook.description}
                    </Typography>

                    {/* 📚 Informations principales */}
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={3}
                      sx={{
                        mt: 3,
                        p: 2,
                        borderTop: "1px solid #ddd",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          <strong> Année de publication :</strong>{" "}
                          {currentBook.publishYear}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong> Nombre de pages :</strong>{" "}
                          {currentBook.pages}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong> Catégorie :</strong> {currentBook.categoryId}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong> Langue :</strong>{" "}
                          {currentBook.language.toUpperCase()}
                        </Typography>
                      </Stack>

                      <Stack spacing={1}>
                        <Typography variant="body2" color="text.secondary">
                          <strong> Note :</strong> {currentBook.rating}/5 (
                          {currentBook.reviewCount} avis)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong> Prix :</strong>{" "}
                          {currentBook.price.toFixed(2)} FRCFA
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong> En stock :</strong>{" "}
                          {currentBook.inStock ? "Oui " : "Non "}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>ISBN :</strong> {currentBook.isbn}
                        </Typography>
                      </Stack>
                    </Stack>

                    {/* 🔖 Sujets */}
                    {currentBook.subjects?.length ? (
                      <Box sx={{ mt: 3 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          Thèmes abordés :
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1.5}>
                          {currentBook.subjects.map(
                            (subj: string, idx: number) => (
                              <Stack
                                key={idx}
                                sx={{
                                  backgroundColor: "#d68b19",
                                  color: "white",
                                  px: 2,
                                  py: 0.5,
                                  borderRadius: "12px",
                                  fontSize: "0.85rem",
                                  mb: 1,
                                }}
                              >
                                {subj}
                              </Stack>
                            ),
                          )}
                        </Stack>
                      </Box>
                    ) : null}
                  </Stack>
                  <Button
                    disableElevation
                    loading={loadButtonAdd}
                    onClick={addCard}
                    size={"small"}
                    variant={"contained"}
                    startIcon={
                      loadButtonAdd ? (
                        <></>
                      ) : (
                        <Icon
                          icon="mage:basket"
                          width="20"
                          height="20"
                          style={{ color: "white" }}
                        />
                      )
                    }
                    sx={{
                      textTransform: "uppercase",
                      color: "white",
                      p: "12px 20px",
                      "&:hover": {
                        backgroundColor: "primary.main",
                      },
                    }}
                  >
                    Ajouter au panier
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Stack>
      </PageContainer>
      <DrawerPanier open={open} setOpen={setOpen} />
    </>
  );
}

export function PageSuspense() {
  return (
    <Suspense>
      <SuspendedBookDetails />
    </Suspense>
  );
}
