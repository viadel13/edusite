import { Typography } from "@mui/material";
import PageContainer from "@/components/layout/PageContainer/PageContainer";

function CategoriesSection() {
  return (
    <PageContainer mt={{ xs: 5, sm: 5, md: 15 }}>
      <Typography
        sx={{
          fontSize: { xs: 25, sm: 30, md: 40 },
          textAlign: "center",
        }}
      >
        Top Categories
      </Typography>
    </PageContainer>
  );
}
export default CategoriesSection;
