"use client";

import { Breadcrumbs, Link as MUILink, Paper, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import PageContainer from "@/components/layout/PageContainer/PageContainer";

export default function AboutPage() {
  return (
    <PageContainer>
      <Breadcrumbs separator="›" sx={{ mt: { xs: 6.5, sm: 2 } }}>
        <MUILink component={NextLink} href="/" underline="hover" color="inherit">
          Accueil
        </MUILink>
        <Typography color="text.primary">À propos</Typography>
      </Breadcrumbs>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mt: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Stack spacing={2}>
          <Typography variant="h3">À propos d&apos;Edusite</Typography>
          <Typography>
            Edusite est une librairie numérique pensée pour rendre la lecture et
            l&apos;apprentissage accessibles à tous. Notre mission est d&apos;offrir une
            sélection pertinente d&apos;ouvrages scolaires, universitaires et grand public.
          </Typography>
          <Typography>
            Nous construisons une expérience simple, fluide et sécurisée pour vous
            permettre de rechercher un livre, comparer les catégories et commander en
            quelques clics.
          </Typography>
        </Stack>
      </Paper>
    </PageContainer>
  );
}
