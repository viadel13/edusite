import Grid from "@mui/material/Grid";
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  NativeSelect,
  SelectChangeEvent,
  Stack,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import React, { ChangeEvent, useEffect, useState } from "react";
import { fetchAllBooks } from "@/store/slices/booksThunks";
import {
  selectAllBooks,
  selectBooksError,
  selectBooksLoading,
} from "@/store/slices/booksSlice";
import SpecialProductSwipper from "@/components/ui/swipper/SpecialProductSwipper/SpecialProductSwipper";
import FilterProductSwipper from "@/components/ui/swipper/FilterProductSwipper/FilterProductSwipper";
import {
  SkeletonFilterProduct,
  SkeletonSpecialProduct,
} from "@/components/ui/SkeletonCard/SkeletonCard";

function SpecialProducts() {
  const dispatch = useAppDispatch(),
    allBooks = useAppSelector(selectAllBooks),
    loading = useAppSelector(selectBooksLoading),
    error = useAppSelector(selectBooksError),
    [initialLoading, setInitialLoading] = useState(true),
    isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("md")),
    isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up("sm")),
    [selectedOption, setSelectedOption] = React.useState<number>(30);

  useEffect(() => {
    dispatch(fetchAllBooks()).finally(() => setInitialLoading(false));
  }, [dispatch]);

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value)); // Conversion en nombre
  };

  const getNumItems = () => {
    if (isLargeScreen) return 4;
    if (isMediumScreen) return 2;
    return 2;
  };

  return (
    <>
      <Grid container spacing={5} mt={10}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Typography
            mb={{ xs: 5, sm: 10 }}
            sx={{
              fontSize: { xs: "1.4rem", sm: "1.7rem", md: "2rem" },
              textAlign: { xs: "center", sm: "start", md: "start" },
            }}
          >
            Produits spéciaux
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {error}
            </Alert>
          )}

          {initialLoading || loading ? (
            <SkeletonSpecialProduct />
          ) : (
            <SpecialProductSwipper allBooks={allBooks} />
            // 🟢 Liste des livres
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={{ xs: "center", sm: "start", md: "start" }}
            spacing={3}
            mb={{ xs: 5, sm: 10 }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.4rem", sm: "1.7rem", md: "2rem" },
              }}
            >
              Trier
            </Typography>

            <Box sx={{ maxWidth: 300, margin: "0 auto", padding: 2 }}>
              {/* NativeSelect dropdown */}
              <NativeSelect
                value={selectedOption}
                onChange={handleSortChange}
                inputProps={{
                  name: "trier",
                  id: "uncontrolled-native",
                }}
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.7rem", md: "1.7rem" },
                }}
              >
                <option value={30} style={{ fontSize: 18 }}>
                  Meilleures ventes
                </option>
                <option value={1} style={{ fontSize: 18 }}>
                  Nouveaux produits
                </option>
              </NativeSelect>

              {/* Display content based on selection */}
            </Box>
          </Stack>
          {initialLoading || loading ? (
            <Grid container spacing={2}>
              {Array(getNumItems())
                .fill(undefined)
                .map((_, index) => (
                  <Grid size={{ xs: 6, sm: 6, md: 6 }} key={index}>
                    <SkeletonFilterProduct />
                  </Grid>
                ))}
            </Grid>
          ) : (
            <FilterProductSwipper
              allBooks={allBooks}
              selectedOption={selectedOption}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
export default SpecialProducts;
