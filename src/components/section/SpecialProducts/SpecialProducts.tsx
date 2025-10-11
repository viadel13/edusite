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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
          <Typography fontSize={{ xs: 30 }} mb={10}>
            Produits spéciaux
          </Typography>
          <SpecialProductSwipper allBooks={allBooks} />
        </Grid>
        <Grid size={{ xs: 6, sm: 12, md: 6 }}>
          <Stack direction={"row"} alignItems={"center"} spacing={3} mb={10}>
            <Typography fontSize={{ xs: 30 }}>Magasiner par</Typography>
            <Box sx={{ minWidth: 120 }}>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: "age",
                  id: "uncontrolled-native",
                }}
                sx={{ fontSize: 30 }}
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
          {/*<FilterProductSwipper allBooks={allBooks} />*/}
        </Grid>
      </Grid>
    </PageContainer>
  );
}
export default SpecialProducts;
