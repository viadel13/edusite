"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectAllBooks,
  selectBooksError,
  selectBooksLoading,
  selectCategoriesSuper,
  selectSelectedCategory,
  setSelectedCategory,
} from "@/store/slices/booksSlice";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import CategoriesSwipper from "@/components/ui/CategoriesSwipper/CategoriesSwipper";
import {
  fetchBooksByCategory,
  fetchCategoriesSuper,
} from "@/store/slices/booksThunks";

const CategoriesSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectAllBooks);
  const loading = useAppSelector(selectBooksLoading);
  const error = useAppSelector(selectBooksError);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const categoriesSuper = useAppSelector(selectCategoriesSuper);
  const [initialLoading, setInitialLoading] = useState(true);

  // Charger la première catégorie au montage
  // useEffect(() => {
  //   if (!selectedCategory) {
  //     handleCategoryClick("biography");
  //   } else {
  //     setInitialized(true);
  //   }
  // }, []);

  useEffect(() => {
    const firstCategory = selectedCategory || "biography";
    dispatch(setSelectedCategory(firstCategory));
    dispatch(fetchBooksByCategory(firstCategory)).finally(() =>
      setInitialLoading(false),
    );
  }, []);

  useEffect(() => {
    dispatch(fetchCategoriesSuper());
  }, [dispatch]);

  // Gérer le clic sur une catégorie
  const handleCategoryClick = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(fetchBooksByCategory(categoryId));
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
        {/* Grille des livres */}

        {categoriesSuper.length > 0 &&
          categoriesSuper.map((category) => (
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
                    selectedCategory === category.id
                      ? category.color
                      : "#F9FAFB",
                  borderColor: category.color,
                  borderWidth: 2,
                },
              }}
            >
              {category.name}
            </Button>
          ))}
      </Box>

      {/* Affichage des erreurs */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {initialLoading || loading ? (
        // 🟡 Toujours afficher le loader pendant le premier chargement ou un changement de catégorie
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress
            size={60}
            sx={{
              color: "#D68B19",
            }}
          />
        </Box>
      ) : books.length === 0 ? (
        // 🔴 Aucun livre trouvé
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#D68B19",
              fontSize: 17,
            }}
          >
            Aucun livre trouvé dans cette catégorie.
          </Typography>
        </Box>
      ) : (
        // 🟢 Liste des livres
        <CategoriesSwipper books={books} selectedCategory={selectedCategory} />
      )}
    </PageContainer>
  );
};

export default CategoriesSection;
