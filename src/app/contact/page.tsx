"use client";

import {
  Breadcrumbs,
  Button,
  Link as MUILink,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import PageContainer from "@/components/layout/PageContainer/PageContainer";

export default function ContactPage() {
  return (
    <PageContainer>
      <Breadcrumbs separator="›" sx={{ mt: { xs: 6.5, sm: 2 } }}>
        <MUILink component={NextLink} href="/" underline="hover" color="inherit">
          Accueil
        </MUILink>
        <Typography color="text.primary">Contact</Typography>
      </Breadcrumbs>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mt: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Stack spacing={2.5}>
          <Typography variant="h3">Contactez-nous</Typography>
          <Typography color="text.secondary">
            Une question sur un livre, une commande ou un paiement ? Notre équipe vous
            répond rapidement.
          </Typography>
          <TextField label="Nom complet" fullWidth />
          <TextField label="Adresse e-mail" type="email" fullWidth />
          <TextField label="Message" multiline minRows={5} fullWidth />
          <Button variant="contained" sx={{ width: "fit-content", textTransform: "none" }}>
            Envoyer le message
          </Button>
        </Stack>
      </Paper>
    </PageContainer>
  );
}
