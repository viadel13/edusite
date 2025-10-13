"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Tabs,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectAllBooks,
  selectBooksByIdCategorie,
  selectBooksError,
  selectBooksLoading,
  selectBooksloadingCatetogerie,
  selectCategoriesSuper,
  selectErrorBooksByIdCategorie,
  selectloadingBooksByIdCategorie,
  selectSelectedCategory,
  setSelectedCategory,
} from "@/store/slices/booksSlice";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import CategoriesSwipper from "@/components/ui/CategoriesSwipper/CategoriesSwipper";
import Tab from "@mui/material/Tab";

import {
  fetchBooksByCategory,
  fetchCategoriesSuper,
} from "@/store/slices/booksThunks";

const CategoriesSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooksByIdCategorie);
  const loadingCategorieBooksByIdCategorie = useAppSelector(
    selectloadingBooksByIdCategorie,
  );
  const error = useAppSelector(selectErrorBooksByIdCategorie);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const categoriesSuper = useAppSelector(selectCategoriesSuper);
  const [initialLoading, setInitialLoading] = useState(true);
  const [value, setValue] = useState(0);

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          fontSize: { xs: "1.4rem", sm: "1.7rem", md: "2.2rem" },
          letterSpacing: "0.05em",
        }}
      >
        Top Categories
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 6,
          flexWrap: "wrap",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {categoriesSuper.length > 0 &&
            categoriesSuper.map((category) => (
              <Tab
                key={category.id}
                label={category.name}
                onClick={() => handleCategoryClick(category.id)}
                sx={{
                  fontSize: "1.1rem",
                }}
              />
            ))}
        </Tabs>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {initialLoading || loadingCategorieBooksByIdCategorie ? (
        <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
          <CircularProgress
            size={40}
            sx={{
              color: "#D68B19",
            }}
          />
        </Box>
      ) : books.length === 0 ? (
        <Box sx={{ textAlign: "center", pb: 2 }}>
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
        <>
          <CategoriesSwipper
            books={books}
            selectedCategory={selectedCategory}
          />
        </>
        // 🟢 Liste des livres
      )}
    </PageContainer>
  );
};

export default CategoriesSection;
