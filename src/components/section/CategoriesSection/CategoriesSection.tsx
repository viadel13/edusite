"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  useMediaQuery,
  Stack,
  Skeleton,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectAllBooks,
  selectBooksByIdCategorie,
  selectBooksError,
  selectBooksLoading,
  selectBooksloadingSuperCategories,
  selectCategoriesSuper,
  selectErrorBooksByIdCategorie,
  selectloadingBooksByIdCategorie,
  selectSelectedCategory,
  setSelectedCategory,
} from "@/store/slices/booksSlice";

import CategoriesSwipper from "@/components/ui/swipper/CategoriesSwipper/CategoriesSwipper";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import {
  fetchBooksByCategory,
  fetchCategoriesSuper,
} from "@/store/slices/booksThunks";
import { SkeletonProductByCategorie } from "@/components/ui/SkeletonCard/SkeletonCard";
import Categories from "@/components/common/Categories/Categories";

const CategoriesSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectBooksByIdCategorie);
  const loadingCategorieBooksByIdCategorie = useAppSelector(
    selectloadingBooksByIdCategorie,
  );
  const loadingSuperCategories = useAppSelector(
    selectBooksloadingSuperCategories,
  );
  const error = useAppSelector(selectErrorBooksByIdCategorie);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const categoriesSuper = useAppSelector(selectCategoriesSuper);
  const [initialLoading, setInitialLoading] = useState(true);
  const [value, setValue] = useState(0);
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));

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

  const handleCategoryClick = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
    dispatch(fetchBooksByCategory(categoryId));
  };

  const getNumItems = () => {
    if (isLargeScreen) return 4;
    if (isMediumScreen) return 2;
    return 2;
  };

  return (
    <Stack mt={10}>
      {/* En-tête */}
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 300,
          mb: 6,
          fontSize: { xs: "1.4rem", sm: "1.7rem", md: "2rem" },
          letterSpacing: "0.05em",
        }}
      >
        Top Categories
      </Typography>
      {initialLoading || loadingSuperCategories ? (
        <Stack alignItems={"center"} mb={4}>
          <Skeleton
            variant="rectangular"
            width={300}
            height={20}
            sx={{
              borderRadius: 5,
            }}
          />
        </Stack>
      ) : (
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
            allowScrollButtonsMobile
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
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {initialLoading || loadingCategorieBooksByIdCategorie ? (
        <Grid container spacing={2}>
          {Array(getNumItems())
            .fill(undefined)
            .map((_, index) => (
              <Grid size={{ xs: 6, sm: 6, md: 3 }} key={index}>
                <SkeletonProductByCategorie />
              </Grid>
            ))}
        </Grid>
      ) : (
        <>
          <CategoriesSwipper
            books={books}
            selectedCategory={selectedCategory}
          />
        </>
      )}
    </Stack>
  );
};

export default CategoriesSection;
