import { Typography } from "@mui/material";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import Grid from "@mui/material/Grid";

function Page() {
  return (
    <PageContainer mt={10}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 8 }}></Grid>
        <Grid size={{ xs: 12, sm: 12, md: 4 }}></Grid>
      </Grid>
    </PageContainer>
  );
}

export default Page;
