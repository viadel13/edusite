"use client";

import React, { useEffect } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchCategories } from "@/store/slices/booksThunks";
import {
  selectCategories,
  selectLoadingCatetogeries,
} from "@/store/slices/booksSlice";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import { usePathname, useRouter } from "next/navigation";

export default function Categories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectLoadingCatetogeries);
  const { setLoadPage } = usePageLoader();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId: string) => {
    if (pathname !== "/categories") {
      setLoadPage(true);
    }
    router.push(`/categories?category=${categoryId}`);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 100,
        zIndex: 10,
        mt: 10,
        borderLeft: "1px solid rgba(108, 117, 125, 0.2)",
        borderRight: "1px solid rgba(108, 117, 125, 0.2)",
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
          Catégories
        </Typography>
        <Divider />
        {loading ? (
          <Stack alignItems="center" justifyContent="center" py={3}>
            <CircularProgress />
          </Stack>
        ) : (
          <List disablePadding>
            {categories.map((cat) => (
              <Stack key={cat.id}>
                <ListItemButton
                  onClick={() => handleCategoryClick(cat.id)}
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
  );
}
