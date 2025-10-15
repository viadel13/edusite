"use client";

import { Button, Stack } from "@mui/material";
import HeroSection from "@/components/section/HeroSection/HeroSection";

import BenefitsService from "@/components/section/BenefitsService/BenefitsService";
import CategoriesSection from "@/components/section/Categories/CategoriesSection";
import SpecialProducts from "@/components/section/SpecialProducts/SpecialProducts";
import OurAuthors from "@/components/section/OurAuthors/OurAuthors";

export default function Home() {
  return (
    <Stack
      sx={{ mt: (theme) => `calc(${theme.mixins.toolbar.minHeight}px + 40px)` }}
    >
      <HeroSection />
      <BenefitsService />
      <CategoriesSection />
      <SpecialProducts />
      <OurAuthors />
    </Stack>
  );
}
