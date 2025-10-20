"use client";

import {
  Breadcrumbs,
  Stack,
  Typography,
  Link as MUILink,
  Paper,
  Box,
} from "@mui/material";
import React, { Suspense, useEffect } from "react";
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

function SuspendedBookDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const book = useAppSelector(selectBookById);
  const loading = useAppSelector(selectLoadingBookById);
  const { setLoadPage } = usePageLoader();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (id) dispatch(fetchBookById(id));
  }, [dispatch, id]);

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

      <Stack style={{ marginTop: "15px" }}>
        {loading && <Typography>Chargement du livre...</Typography>}

        {/*{!loading && !currentBook && (*/}
        {/*  <Typography style={{ color: "red" }}>*/}
        {/*    ❌ Le livre que vous recherchez n’existe pas ou a été supprimé.*/}
        {/*  </Typography>*/}
        {/*)}*/}

        {!loading && currentBook && (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <Typography
                variant="h4"
                style={{ fontWeight: "bold", marginBottom: "16px" }}
              >
                {currentBook.title}
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: "50px 0px",
                }}
              >
                <Image
                  alt="errorPage"
                  src={currentBook.coverUrl}
                  width={5000}
                  height={5000}
                  style={{
                    height: "clamp(250px, 20vw, 800px)",
                    width: "clamp(250px, 20vw, 800px)",
                    objectFit: "cover",
                  }}
                  draggable={false}
                />
              </Paper>
              <Stack>
                {currentBook?.othersImagesUrl?.length ? (
                  <DetailsImagesSwipper
                    othersImagesUrl={currentBook.othersImagesUrl}
                  />
                ) : null}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}></Grid>
          </Grid>
        )}
      </Stack>
    </PageContainer>
  );
}

export function PageSuspense() {
  return (
    <Suspense>
      <SuspendedBookDetails />
    </Suspense>
  );
}
