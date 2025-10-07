"use client";

import { Stack } from "@mui/material";
import HeroSection from "@/components/section/HeroSection/HeroSection";

import BenefitsService from "@/components/section/BenefitsService/BenefitsService";
import CategoriesSection from "@/components/section/Categories/CategoriesSection";

export default function Home() {
  return (
    <Stack>
      <HeroSection />
      <BenefitsService />
      <CategoriesSection />
    </Stack>
  );
}
