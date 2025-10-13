import { createTheme } from "@mui/material";
import { typography } from "@/theme/typography";
import { components } from "@/theme/components";
import { palette } from "@/theme/palette";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    ...palette.light,
  },
  typography,
  components,
  shape: {
    borderRadius: 12,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    ...palette.dark,
  },
  typography,
  components,
  shape: {
    borderRadius: 12,
  },
});
