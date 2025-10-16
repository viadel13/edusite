import { CircularProgress, Stack, Typography } from "@mui/material";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";
import { fetchAllAuthors } from "@/store/slices/booksThunks";
import {
  selectAllAuthors,
  selectAuthorsLoading,
} from "@/store/slices/booksSlice";
import OurAuthorsSwipper from "@/components/ui/OurAuthorsSwipper/OurAuthorsSwipper";

function OurAuthors() {
  const dispatch = useAppDispatch(),
    [initialLoading, setInitialLoading] = useState(true),
    authors = useAppSelector(selectAllAuthors),
    loading = useAppSelector(selectAuthorsLoading);

  useEffect(() => {
    dispatch(fetchAllAuthors()).finally(() => setInitialLoading(false));
  }, []);

  return (
    <Stack mt={10}>
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
        Nos Auteurs
      </Typography>
      {initialLoading || loading ? (
        <Stack alignItems={"center"} justifyContent={"center"}>
          <CircularProgress size={35} />
        </Stack>
      ) : (
        <OurAuthorsSwipper authors={authors} />
      )}
    </Stack>
  );
}
export default OurAuthors;
