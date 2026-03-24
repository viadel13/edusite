"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  Alert,
  Breadcrumbs,
  Button,
  Link as MUILink,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FirebaseError } from "firebase/app";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = useMemo(
    () =>
      submitting ||
      !name.trim() ||
      !email.trim() ||
      password.trim().length < 6 ||
      confirmPassword.trim().length < 6,
    [submitting, name, email, password, confirmPassword],
  );

  const resolveErrorMessage = (rawError: unknown) => {
    if (rawError instanceof FirebaseError) {
      switch (rawError.code) {
        case "auth/email-already-in-use":
          return "Cette adresse e-mail est déjà utilisée.";
        case "auth/invalid-email":
          return "Adresse e-mail invalide.";
        case "auth/weak-password":
          return "Le mot de passe est trop faible.";
        default:
          return "Inscription impossible pour le moment. Veuillez réessayer.";
      }
    }
    return "Inscription impossible pour le moment. Veuillez réessayer.";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setSubmitting(true);
      await register({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      router.push("/");
    } catch (rawError) {
      setError(resolveErrorMessage(rawError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Breadcrumbs separator="›" sx={{ mt: { xs: 6.5, sm: 2 } }}>
        <MUILink component={NextLink} href="/" underline="hover" color="inherit">
          Accueil
        </MUILink>
        <Typography color="text.primary">Inscription</Typography>
      </Breadcrumbs>

      <Paper
        elevation={0}
        sx={{ p: { xs: 3, md: 5 }, mt: 2, maxWidth: 540, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      >
        <Stack spacing={2.5} component="form" onSubmit={handleSubmit}>
          <Typography variant="h3">Créer un compte</Typography>
          <Typography color="text.secondary">
            Inscrivez-vous pour passer commande, suivre vos achats et finaliser vos paiements.
          </Typography>
          <TextField
            label="Nom complet"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Adresse e-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            helperText="Minimum 6 caractères"
            required
            fullWidth
          />
          <TextField
            label="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
            fullWidth
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" disabled={disabled} sx={{ textTransform: "none", py: 1.2 }}>
            {submitting ? "Création du compte..." : "S'inscrire"}
          </Button>
        </Stack>
      </Paper>
    </PageContainer>
  );
}
