import { Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import HeroSwipper from "@/components/ui/HeroSwipper/HeroSwipper";

function HeroSection() {
  const SlideOne = (
    <Stack
      sx={{
        height: 500,
        width: "100%",
        backgroundColor: "#95d5b2",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          size={{ xs: 6 }}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 500,
          }}
        >
          <Stack>
            <Typography>Recevez 25% sur chaque livre</Typography>
            <Typography>Collections de livres</Typography>
          </Stack>
        </Grid>
        <Grid size={{ xs: 6 }}>Text</Grid>
      </Grid>
    </Stack>
  );

  return (
    <Stack>
      <HeroSwipper />
    </Stack>
  );
}

export default HeroSection;
