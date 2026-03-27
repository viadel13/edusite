"use client";

import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Pagination,
  FormControl,
  FormControlLabel,
  InputLabel,
  Link as MUILink,
  List,
  ListItemButton,
  ListItemText,
  Select,
  Stack,
  Switch,
  Typography,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import NextLink from "next/link";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectAllBooks,
  selectBooksLoading,
  selectCategories,
  selectLoadingCatetogeries,
} from "@/store/slices/booksSlice";
import { fetchAllBooks, fetchCategories } from "@/store/slices/booksThunks";
import CardProduct from "@/components/ui/Card/CardProduct/CardProduct";
import { Book } from "@/types/firestore.type";
import { Icon } from "@iconify/react";

function CategoriesPageContent() {
  const { setLoadPage } = usePageLoader();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isChecked, setIsChecked] = useState(true);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const books = useAppSelector(selectAllBooks);
  const loadingBooks = useAppSelector(selectBooksLoading);
  const loading = useAppSelector(selectLoadingCatetogeries);
  const [pageSize, setPageSize] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState(1);
  const selectedCategoryId = searchParams.get("category");

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllBooks());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategoryId]);

  const filteredBooks = useMemo(() => {
    if (!selectedCategoryId) return books;
    return books.filter((book) => book.categoryId === selectedCategoryId);
  }, [books, selectedCategoryId]);

  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    return filteredBooks.slice(startIndex, endIndex);
  }, [currentPage, pageSize, filteredBooks]);

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategoryId) return "Toutes les catégories";
    return (
      categories.find((cat) => cat.id === selectedCategoryId)?.name ||
      "Catégorie"
    );
  }, [categories, selectedCategoryId]);

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/categories?category=${categoryId}`);
  };

  const breadcrumbs = [
    <MUILink
      key="1"
      component={NextLink}
      href="/"
      onClick={(e) => {
        e.preventDefault();
        if (pathname !== "/") {
          setLoadPage(true);
          router.push("/");
        }
      }}
      underline="none"
      fontSize={14}
      sx={{
        color: "#757575",
        "&:hover": {
          color: "primary.main",
          textDecoration: "underline",
        },
      }}
    >
      Accueil
    </MUILink>,
    <MUILink
      key="2"
      component={NextLink}
      href="/categories"
      underline="none"
      fontSize={14}
      sx={{
        color: "#757575",
      }}
    >
      Catégories
    </MUILink>,
  ];

  return (
    <PageContainer>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{
          fontSize: "0.95rem",
          marginTop: { xs: 6.5, sm: 2 },
        }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Stack sx={{ mt: "15px" }}>
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <FormControlLabel
            label="Filtres"
            control={<Switch checked={isChecked} onChange={handleSwitchChange} />}
            labelPlacement="end"
            sx={{
              display: { xs: "none", sm: "none", md: "none", lg: "flex" },
            }}
          />
          <Button
            size={"small"}
            startIcon={
              <Icon
                icon="lets-icons:filter"
                width="24"
                height="24"
                style={{ color: "black" }}
              />
            }
            sx={{
              borderColor: "#757575",
              color: "#757575",
              borderRadius: "4px",
              borderWidth: "1px",
              borderStyle: "solid",
              padding: "5px 10px",
              display: { xs: "flex", sm: "flex", md: "flex", lg: "none" },
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderColor: "black",
              },
            }}
          >
            <Typography>Filtres</Typography>
          </Button>

          <Stack direction={"row"} alignItems={"center"} spacing={{ xs: 1, sm: 1, md: 2 }}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <InputLabel sx={{ display: { xs: "none", sm: "flex" } }}>Afficher:</InputLabel>
              <FormControl sx={{ minWidth: { xs: 2, sm: 2, md: 5 } }}>
                <Select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  sx={{
                    fontSize: "0.85rem",
                    height: 35,
                    borderRadius: "4px",
                  }}
                >
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction={"row"} sx={{ width: "100%", transition: "all 0.2s linear", mt: 2, overflow: "hidden" }}>
        <Stack
          sx={{
            width: isChecked ? "20%" : "0",
            position: "relative",
            left: isChecked ? "0" : "-250PX",
            transition: "all 0.2s linear",
            overflow: "hidden",
            display: { xs: "none", sm: "none", md: "none", lg: "flex" },
          }}
        >
          <Box sx={{ border: "1px solid rgba(108, 117, 125, 0.2)" }}>
            <Stack sx={{ borderRadius: 1, overflow: "visible", height: "80vh", p: 1 }}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 300,
                  px: 2,
                  fontSize: { xs: "1.4rem", sm: "1.7rem", md: "1.8rem" },
                  letterSpacing: "0.05em",
                }}
              >
                Catégories
              </Typography>

              {loading ? (
                <Stack alignItems="center" justifyContent="center" py={3}>
                  <CircularProgress />
                </Stack>
              ) : (
                <List disablePadding>
                  <ListItemButton
                    onClick={() => router.push("/categories")}
                    selected={!selectedCategoryId}
                  >
                    <ListItemText primary="TOUTES" />
                  </ListItemButton>
                  {categories.map((cat) => (
                    <Stack key={cat.id}>
                      <ListItemButton
                        onClick={() => handleCategoryClick(cat.id)}
                        selected={selectedCategoryId === cat.id}
                        sx={{
                          py: 1.5,
                          px: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          "&:hover": { backgroundColor: "#f5f5f5" },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight={500}>
                              {cat.name.toUpperCase()}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </Stack>
                  ))}
                </List>
              )}
            </Stack>
          </Box>
        </Stack>

        <Stack
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: isChecked ? "80%" : "100%",
            },
            transition: "width 0.2s linear",
            p: { xs: 0, sm: 0, md: 2 },
          }}
        >
          <Typography mb={2} fontWeight={600}>
            {selectedCategoryName} • {filteredBooks.length} livre(s)
          </Typography>
          <Grid container spacing={2}>
            {loadingBooks ? (
              <Stack alignItems="center" justifyContent="center" py={3} width="100%">
                <CircularProgress />
              </Stack>
            ) : paginatedBooks.length > 0 ? (
              paginatedBooks.map((book: Book) => (
                <Grid key={book.id} size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
                  <CardProduct book={book} />
                </Grid>
              ))
            ) : (
              <Typography p={2}>Aucun livre trouvé pour cette catégorie.</Typography>
            )}
          </Grid>
        </Stack>
      </Stack>
      <Stack alignItems="center" sx={{ mt: 3 }}>
        <Pagination
          count={Math.max(1, Math.ceil(filteredBooks.length / pageSize))}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </PageContainer>
  );
}

export default function PageCategories() {
  return (
    <Suspense
      fallback={
        <PageContainer>
          <Stack alignItems="center" justifyContent="center" py={6}>
            <CircularProgress />
          </Stack>
        </PageContainer>
      }
    >
      <CategoriesPageContent />
    </Suspense>
  );
}
