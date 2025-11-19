"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FirebaseError } from "firebase/app";

import { useAuth } from "@/contexts/AuthContext";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const initialValues = {
  email: "",
  password: "",
};

function LoginDialog({ open, onClose }: LoginDialogProps) {
  const [values, setValues] = useState(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { login } = useAuth();

  const isSubmitDisabled = useMemo(
    () =>
      submitting ||
      values.email.trim().length === 0 ||
      values.password.trim().length === 0,
    [submitting, values.email, values.password],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setValues(initialValues);
    setShowPassword(false);
    setFormError(null);
    onClose();
  };

  const resolveErrorMessage = (error: unknown) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/invalid-email":
        case "auth/wrong-password":
          return "Identifiants incorrects. Merci de réessayer.";
        case "auth/user-disabled":
          return "Ce compte a été désactivé. Contactez le support.";
        case "auth/too-many-requests":
          return "Trop de tentatives. Veuillez patienter quelques instants.";
        default:
          return "Connexion impossible pour le moment. Merci de réessayer.";
      }
    }
    return "Connexion impossible pour le moment. Merci de réessayer.";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    try {
      setSubmitting(true);
      await login(values.email.trim(), values.password.trim());
      handleClose();
    } catch (error) {
      setFormError(resolveErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="login-dialog-title"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1,
          },
        },
      }}
    >
      <DialogTitle
        id="login-dialog-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Connexion
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Heureux de vous revoir ! Connectez-vous pour continuer.
          </Typography>
        </Box>
        <IconButton aria-label="fermer" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5} mt={1.5}>
            <TextField
              required
              name="email"
              label="Adresse e-mail"
              type="email"
              value={values.email}
              onChange={handleChange}
              fullWidth
              autoComplete="email"
            />
            <TextField
              required
              name="password"
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              fullWidth
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "masquer le mot de passe" : "afficher le mot de passe"}
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={isSubmitDisabled}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                py: 1.3,
                fontSize: 16,
              }}
            >
              {submitting ? "Connexion..." : "Se connecter"}
            </Button>
            {formError && (
              <Typography color="error" variant="body2" textAlign="center">
                {formError}
              </Typography>
            )}
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Pas encore de compte ?
          <Box component="span" sx={{ color: "primary.main", fontWeight: 600, ml: 0.5 }}>
            Inscrivez-vous
          </Box>
        </Typography>
      </DialogActions>
    </Dialog>
  );
}

export default LoginDialog;
