"use client";

import { Stack } from "@mui/material";
import HeroSection from "@/components/section/HeroSection";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { setLoadPage } = usePageLoader();
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le chargement initial
  //
  // useEffect(() => {
  //   // Lorsque la page se charge pour la première fois, active le loader
  //   setLoadPage(true);
  //
  //   // Après 1 seconde, désactive le loader
  //   setTimeout(() => {
  //     setIsLoading(false); // Arrête le loader une fois que la page est prête
  //     setLoadPage(false); // Assurez-vous que le loader global est désactivé
  //   }, 1000); // Le délai ici est de 1 seconde, vous pouvez l'ajuster
  // }, [setLoadPage]);
  //
  // if (isLoading) {
  //   return null; // Ne rien rendre tant que le loader est actif
  // }

  return (
    <Stack>
      <HeroSection />
    </Stack>
  );
}
