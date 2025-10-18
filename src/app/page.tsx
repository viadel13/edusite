"use client";

import { Button, Stack } from "@mui/material";
import HeroSection from "@/components/section/HeroSection/HeroSection";

import BenefitsService from "@/components/section/BenefitsService/BenefitsService";
import CategoriesSection from "@/components/section/Categories/CategoriesSection";
import SpecialProducts from "@/components/section/SpecialProducts/SpecialProducts";
import OurAuthors from "@/components/section/OurAuthors/OurAuthors";
import Grid from "@mui/material/Grid";
import Categories from "@/components/common/Categories/Categories";
import PageContainer from "@/components/layout/PageContainer/PageContainer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PageContainer>
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, md: 12, lg: 2.5 }}
            sx={{
              display: {
                xs: "none", // téléphone
                sm: "none", // tablette
                md: "none", // à partir du desktop
                lg: "block",
              },
            }}
          >
            <Categories />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 9.5 }}>
            <Stack>
              <BenefitsService />
              <CategoriesSection />
              <SpecialProducts />
              <OurAuthors />
            </Stack>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
}
