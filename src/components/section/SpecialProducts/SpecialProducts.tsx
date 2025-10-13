import Grid from "@mui/material/Grid";
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  NativeSelect,
  Stack,
  Tabs,
  Typography,
} from "@mui/material";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import React, { useEffect, useState } from "react";
import { fetchAllBooks } from "@/store/slices/booksThunks";
import {
  selectAllBooks,
  selectBooksError,
  selectBooksLoading,
} from "@/store/slices/booksSlice";
import SpecialProductSwipper from "@/components/ui/SpecialProductSwipper/SpecialProductSwipper";
import FilterProductSwipper from "@/components/ui/FilterProductSwipper/FilterProductSwipper";

function SpecialProducts() {
  const dispatch = useAppDispatch(),
    allBooks = useAppSelector(selectAllBooks),
    loading = useAppSelector(selectBooksLoading),
    error = useAppSelector(selectBooksError),
    [initialLoading, setInitialLoading] = useState(true),
    [selectedOption, setSelectedOption] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchAllBooks()).finally(() => setInitialLoading(false));
  }, [dispatch]);

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as number);
  };

  return (
    <PageContainer mt={{ xs: 5, sm: 5, md: 15 }}>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Typography
            mb={{ xs: 5, sm: 10 }}
            sx={{
              fontSize: { xs: "1.4rem", sm: "1.7rem", md: "2.2rem" },
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
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "start", md: "start" },
                pb: 2,
              }}
            >
              <CircularProgress
                size={40}
                sx={{
                  color: "#D68B19",
                }}
              />
            </Box>
          ) : allBooks.length === 0 ? (
            <Box
              sx={{
                textAlign: { xs: "center", sm: "start", md: "start" },
                pb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#D68B19",
                  fontSize: 17,
                }}
              >
                Aucun livre trouvé
              </Typography>
            </Box>
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
                fontSize: { xs: "1.4rem", sm: "1.7rem", md: "2.2rem" },
              }}
            >
              Trier
            </Typography>
            <Box sx={{ minWidth: 120 }}>
              <NativeSelect
                defaultValue={30}
                onChange={handleSortChange}
                inputProps={{
                  name: "trier",
                  id: "uncontrolled-native",
                }}
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.7rem", md: "1.8rem" },
                }}
              >
                <option
                  value={1}
                  style={{
                    fontSize: 18,
                  }}
                >
                  Meilleures ventes
                </option>
                <option
                  value={2}
                  style={{
                    fontSize: 18,
                  }}
                >
                  Nouveaux produits
                </option>
              </NativeSelect>
            </Box>
          </Stack>
          {initialLoading || loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "start", md: "start" },
                pb: 2,
              }}
            >
              <CircularProgress
                size={40}
                sx={{
                  color: "#D68B19",
                }}
              />
            </Box>
          ) : allBooks.length === 0 ? (
            <Box sx={{ textAlign: { xs: "center", md: "start" }, pb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "#D68B19",
                  fontSize: 17,
                }}
              >
                Aucun livre trouvé
              </Typography>
            </Box>
          ) : (
            <FilterProductSwipper
              allBooks={allBooks}
              selectedOption={selectedOption}
            />
          )}
        </Grid>
      </Grid>
    </PageContainer>
  );
}
export default SpecialProducts;
