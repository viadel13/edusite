"use client";
import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchBooksByCategory,
  selectAllBooks,
  selectBooksError,
  selectBooksLoading,
  selectSelectedCategory,
  setSelectedCategory,
} from "@/store/slices/bookSlice";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import CategoriesSwipper from "@/components/ui/CategoriesSwipper/CategoriesSwipper";

const CategoriesSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectAllBooks);
  const loading = useAppSelector(selectBooksLoading);
  const error = useAppSelector(selectBooksError);
  const selectedCategory = useAppSelector(selectSelectedCategory);

  // Définir les 3 catégories principales
  const topCategories = [
    { id: "biography", label: "BIOGRAPHY", color: "#F59E0B" },
    { id: "thriller", label: "THRILLER", color: "#F59E0B" },
    { id: "science_fiction", label: "SCI-FI", color: "#F59E0B" },
  ];

  // Charger la première catégorie au montage
  useEffect(() => {
    if (!selectedCategory) {
      handleCategoryClick("biography");
    }
  }, []);

  // Gérer le clic sur une catégorie
  const handleCategoryClick = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(fetchBooksByCategory(categoryId));
  };

  // Générer un prix aléatoire pour la démo
  const getRandomPrice = () => {
    return (Math.random() * 50 + 10).toFixed(2);
  };

  // Générer une note aléatoire
  const getRandomRating = () => {
    return Math.floor(Math.random() * 2) + 3; // Entre 3 et 5
  };

  return (
    <PageContainer mt={{ xs: 5, sm: 5, md: 15 }}>
      {/* En-tête */}
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 300,
          mb: 6,
          fontSize: { xs: "2rem", md: "3rem" },
          letterSpacing: "0.05em",
        }}
      >
        Top Categories
      </Typography>

      {/* Boutons des catégories */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 6,
          flexWrap: "wrap",
        }}
      >
        {topCategories.map((category) => (
          <Button
            key={category.id}
            variant={
              selectedCategory === category.id ? "contained" : "outlined"
            }
            onClick={() => handleCategoryClick(category.id)}
            sx={{
              fontSize: "0.9rem",

              letterSpacing: "0.05em",
              borderRadius: 0,
              borderWidth: 2,
              backgroundColor:
                selectedCategory === category.id
                  ? category.color
                  : "transparent",
              borderColor:
                selectedCategory === category.id ? category.color : "#E5E7EB",
              color: selectedCategory === category.id ? "white" : "#374151",
              "&:hover": {
                backgroundColor:
                  selectedCategory === category.id ? category.color : "#F9FAFB",
                borderColor: category.color,
                borderWidth: 2,
              },
            }}
          >
            {category.label}
          </Button>
        ))}
      </Box>

      {/* Affichage des erreurs */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Loader */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Grille des livres */}
      {!loading && books.length > 0 && (
        <CategoriesSwipper
          books={books}
          getRandomPrice={getRandomPrice}
          getRandomRating={getRandomRating}
          selectedCategory={selectedCategory}
        />
      )}

      {/* Message si aucun livre */}
      {!loading && books.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Aucun livre trouvé dans cette catégorie.
          </Typography>
        </Box>
      )}
    </PageContainer>
  );
};

export default CategoriesSection;
