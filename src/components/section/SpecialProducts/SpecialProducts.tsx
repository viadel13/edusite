import Grid from "@mui/material/Grid";
import {
  Box,
  FormControl,
  InputLabel,
  NativeSelect,
  Stack,
  Typography,
} from "@mui/material";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import { fetchAllBooks } from "@/store/slices/booksThunks";
import { selectAllBooks, selectItemsNoFilter } from "@/store/slices/booksSlice";
import SpecialProductSwipper from "@/components/ui/SpecialProductSwipper/SpecialProductSwipper";
import FilterProductSwipper from "@/components/ui/FilterProductSwipper/FilterProductSwipper";

function SpecialProducts() {
  const dispatch = useAppDispatch(),
    allBooks = useAppSelector(selectItemsNoFilter);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  return (
    <PageContainer mt={{ xs: 5, sm: 5, md: 15 }}>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Typography
            mb={{ xs: 5, sm: 10 }}
            sx={{
              fontSize: { xs: "1.4rem", sm: "1.7rem", md: "2.2rem" },
            }}
          >
            Produits spéciaux
          </Typography>
          <SpecialProductSwipper allBooks={allBooks} />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
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
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
                sx={{
                  fontSize: { xs: "1.2rem", sm: "1.7rem", md: "1.8rem" },
                }}
              >
                <option
                  value={10}
                  style={{
                    fontSize: 18,
                  }}
                >
                  Meilleures ventes
                </option>
                <option
                  value={10}
                  style={{
                    fontSize: 18,
                  }}
                >
                  Nouveaux produits
                </option>
              </NativeSelect>
            </Box>
          </Stack>
          <FilterProductSwipper allBooks={allBooks} />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
export default SpecialProducts;
