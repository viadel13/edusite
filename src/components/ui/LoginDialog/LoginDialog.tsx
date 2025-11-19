"use client";

import { ChangeEvent, FormEvent, useState } from "react";
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setValues(initialValues);
    setShowPassword(false);
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: replace with actual authentication logic
    handleClose();
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
            />
            <TextField
              required
              name="password"
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              fullWidth
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
              sx={{
                textTransform: "none",
                borderRadius: 2,
                py: 1.3,
                fontSize: 16,
              }}
            >
              Se connecter
            </Button>
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
