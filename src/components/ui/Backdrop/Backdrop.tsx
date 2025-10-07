import {
  Backdrop as MuiBackdrop,
  BackdropProps as MuiBackdropProps,
  Stack,
  Typography,
} from "@mui/material";

import { BounceLoader } from "react-spinners";

export interface BackdropProps {
  load: boolean;
  sx?: MuiBackdropProps["sx"];
}

export const Backdrop = ({ load, sx = {} }: BackdropProps) => {
  return (
    <MuiBackdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ...sx,
      }}
      open={load}
    >
      <Stack
        direction={"column"}
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
        width={"100%"}
      >
        <BounceLoader
          color={"#D68B19"}
          loading
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <Typography>Chargement</Typography>
      </Stack>
    </MuiBackdrop>
  );
};

export default Backdrop;
