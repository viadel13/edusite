"use client";

import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCategories,
  selectLoadingCatetogeries,
} from "@/store/slices/booksSlice";
import React, { useEffect } from "react";
import { fetchCategories } from "@/store/slices/booksThunks";
import { Icon } from "@iconify/react";
import Grid from "@mui/material/Grid";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import { usePathname, useRouter } from "next/navigation";

function pageLivres() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectLoadingCatetogeries);
  const { setLoadPage } = usePageLoader();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <PageContainer mb={10}>
      <Stack alignItems="center" justifyContent="center" width={"100%"}>
        <Image
          alt="errorPage"
          src={"/images/errorPage.png"}
          width={5000}
          height={5000}
          style={{
            height: "clamp(250px, 20vw, 800px)",
            width: "clamp(250px, 20vw, 800px)",
            objectFit: "cover",
          }}
          draggable={false}
        />
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 8,
            gap: 2,
          }}
        >
          <Typography
            textAlign={"center"}
            fontWeight={"bold"}
            sx={{
              fontSize: "clamp(25px, 4vw, 30px)",
            }}
          >
            Oups, que s'est-il passé ?
          </Typography>
          <Typography
            textAlign={"center"}
            sx={{
              fontSize: "clamp(14px, 3vw, 18px)",
            }}
          >
            La page que vous recherchez n’existe pas ou a été déplacée.
          </Typography>
          <Typography
            textAlign={"center"}
            sx={{
              fontSize: "clamp(14px, 3vw, 18px)",
            }}
          >
            Erreur serveur
          </Typography>
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
        </Paper>
        <Typography
          my={4}
          sx={{
            fontWeight: "bold",
            fontSize: "22px",
          }}
        >
          Voir nos categories
        </Typography>

        {loading ? (
          <Stack alignItems="center" justifyContent="center" py={3}>
            <CircularProgress />
          </Stack>
        ) : (
          <Grid container spacing={2}>
            {categories.map((cat) => (
              <Grid size={{ xs: 6, sm: 6, md: 3 }} key={cat.id}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "2px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 3,
                  }}
                >
                  <Icon
                    icon="material-symbols-light:book-6-outline"
                    width="40"
                    height="40"
                    style={{ color: "#D68B19" }}
                  />
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {cat.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>
    </PageContainer>
  );
}
export default pageLivres;
