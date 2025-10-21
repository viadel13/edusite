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
import React, { useEffect, useState } from "react";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import { usePathname, useRouter } from "next/navigation";
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

function PageCategories() {
  const { setLoadPage } = usePageLoader();
  const pathname = usePathname();
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(true);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const books = useAppSelector(selectAllBooks);
  const loadingBooks = useAppSelector(selectBooksLoading);
  const loading = useAppSelector(selectLoadingCatetogeries);
  const [pageSize, setPageSize] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedBooks, setPaginatedBooks] = useState<Book[]>([]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllBooks());
  }, [dispatch]);

  useEffect(() => {
    if (books.length > 0) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = currentPage * pageSize;
      setPaginatedBooks(books.slice(startIndex, endIndex));
    }
  }, [currentPage, pageSize, books]);

  // Fonction pour gérer le changement du nombre d'articles par page
  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    // Assurez-vous de convertir la valeur en un nombre
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Réinitialiser la page à 1 lors du changement du nombre d'articles par page
  };

  // Fonction pour gérer le changement de page
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Scroll en douceur vers le haut de la page
    });
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
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
      href="/panier"
      onClick={(e) => {
        e.preventDefault();
        if (pathname !== "/categories") {
          setLoadPage(true);
          router.push("/categories");
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
      Categories
    </MUILink>,
  ];

  // @ts-ignore
  return (
    <>
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
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <FormControlLabel
              label="Filtres"
              control={
                <Switch checked={isChecked} onChange={handleSwitchChange} />
              }
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

            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={{ xs: 1, sm: 1, md: 2 }}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <InputLabel
                  sx={{
                    display: { xs: "none", sm: "flex" },
                  }}
                >
                  Trier par:
                </InputLabel>
                <FormControl sx={{ minWidth: { xs: 2, sm: 2, md: 120 } }}>
                  <Select
                    defaultValue="newest"
                    sx={{
                      fontSize: "0.85rem",
                      height: 35,
                      borderRadius: "4px",
                      padding: "5px",
                    }}
                  >
                    <MenuItem value="default">Default sorting</MenuItem>
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="oldest">Oldest</MenuItem>
                  </Select>
                </FormControl>
              </Stack>{" "}
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <InputLabel
                  sx={{
                    display: { xs: "none", sm: "flex" },
                  }}
                >
                  Afficher:
                </InputLabel>
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
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction={"row"}
          // spacing={isChecked ? 2 : 0}
          sx={{
            width: "100%",
            transition: "all 0.2s linear",
            mt: 2,
            overflow: "hidden",
          }}
        >
          <Stack
            sx={{
              width: isChecked ? "20%" : "0",

              position: "relative",
              left: isChecked ? "0" : "-250PX",
              transition: "all 0.2s linear",
              overflow: "hidden",
              display: {
                xs: "none",
                sm: "none",
                md: "none",
                lg: "flex",
              },
            }}
          >
            <Box
              sx={{
                border: "1px solid rgba(108, 117, 125, 0.2)",
              }}
            >
              <Stack
                sx={{
                  borderRadius: 1,
                  overflow: "visible",
                  height: "80vh",
                  p: 1,
                }}
              >
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
                  Categories
                </Typography>

                {loading ? (
                  <Stack alignItems="center" justifyContent="center" py={3}>
                    <CircularProgress />
                  </Stack>
                ) : (
                  <List disablePadding>
                    {categories.map((cat) => (
                      <Stack key={cat.id}>
                        <ListItemButton
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
            <Grid container spacing={2}>
              {paginatedBooks.length > 0 ? (
                paginatedBooks.map((book, index) => (
                  <Grid key={index} size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
                    <CardProduct book={book} />
                  </Grid>
                ))
              ) : (
                <Stack alignItems="center" justifyContent="center" py={3}>
                  <CircularProgress />
                </Stack>
              )}
            </Grid>
          </Stack>
        </Stack>
        <Stack alignItems="center" sx={{ mt: 3 }}>
          <Pagination
            count={Math.ceil(books.length / pageSize)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </PageContainer>
    </>
  );
}

export default PageCategories;
