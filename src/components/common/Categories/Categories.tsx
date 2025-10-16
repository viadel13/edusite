"use client";

import React, { useEffect, useState } from "react";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  Stack,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchBooksByCategory,
  fetchCategories,
} from "@/store/slices/booksThunks";
import {
  selectCategories,
  selectLoadingCatetogeries,
} from "@/store/slices/booksSlice";

export default function Categories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectLoadingCatetogeries);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 100,
        zIndex: 10,
        mt: 10,
        border: "1px solid rgba(108, 117, 125, 0.2)",
        borderRadius: 1,
        // boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
        <Divider />
        {loading ? (
          <Stack alignItems="center" justifyContent="center" py={3}>
            <CircularProgress />
          </Stack>
        ) : (
          <List disablePadding>
            {categories.map((cat) => (
              <div key={cat.id}>
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
              </div>
            ))}
          </List>
        )}
      </Stack>
    </Box>
  );
}
