"use client";

import { CategoriesSwipperProps } from "@/components/ui/swipper/CategoriesSwipper/CategoriesSwipper";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { BounceLoader } from "react-spinners";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import { usePathname, useRouter } from "next/navigation";
import { Book } from "@/types/firestore.type";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useAppSelector } from "@/hooks/redux";
import { selectLoadItemsClick } from "@/store/slices/cartSlice";
import { useState } from "react";
import DrawerPanier from "@/components/ui/DrawerPanier/DrawerPanier";

interface CardProductProps {
  book: Book;
  selectedCategory?: string;
}

function CardProduct({ book, selectedCategory }: CardProductProps) {
  const { setLoadPage } = usePageLoader();
  const pathname = usePathname();
  const router = useRouter();
  const { handleAddToCart, loadingAction, animateId, showPlusId } =
    useAddToCart();
  const loadItemsClick = useAppSelector(selectLoadItemsClick);
  const isLoading =
    loadingAction.id === book.id && loadingAction.type === "add";
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        elevation={0}
        onClick={() => {
          if (pathname !== "/livres/") {
            setLoadPage(true);
            router.push(`/livres/${book.id}`);
          }
        }}
        sx={{
          width: "100%",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          },
          position: "relative",
          pointerEvents: loadItemsClick ? "none" : "auto",
        }}
      >
        {/* Image de couverture */}
        <CardMedia
          component="img"
          image={book.coverUrl}
          alt={book.title}
          sx={{
            height: { xs: 200, sm: 250 },
            objectFit: "cover",
          }}
        />

        {/* Contenu */}
        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          {/* Catégorie */}
          <Typography
            variant="caption"
            sx={{
              color: "#9CA3AF",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontWeight: 600,
              display: "block",
              mb: 1,
            }}
          >
            {selectedCategory?.replace("_", " ")}
          </Typography>

          {/* Titre */}
          <Stack direction="column" width={"100%"} pb={2}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                fontSize: "1rem",
                fontWeight: 400,
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {book.title}
            </Typography>
            <Rating value={book.rating} readOnly size="small" sx={{ mb: 1 }} />
          </Stack>
          {/* Prix */}
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1,
              mb: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#111827",
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              {book.price} FRCFA
            </Typography>
          </Box>

          {/* Auteur */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.875rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {book.author[0]}
          </Typography>
        </CardContent>

        {/* Actions */}
        <CardActions sx={{ px: 2, pb: 2 }}>
          <IconButton
            sx={{
              width: 35,
              height: 35,
              borderRadius: 999,
              backgroundColor: "#D68B19",
              pointerEvents: loadItemsClick ? "none" : "auto",
              "@media (hover: hover) and (pointer: fine)": {
                "&:hover": {
                  backgroundColor: "black",
                },
              },
              "@media (hover: none) and (pointer: coarse)": {
                "&:hover": {
                  backgroundColor: "#D68B19",
                  opacity: 0.8,
                },
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (pathname !== "/livres/") {
                setLoadPage(true);
                router.push(`/livres/${book.id}`);
              }
            }}
          >
            <Icon
              icon="iconamoon:eye-light"
              width="24"
              height="24"
              style={{
                color: "white",
              }}
            />
          </IconButton>
          <Box>
            <motion.div
              animate={
                animateId === book.id
                  ? { rotate: [0, -15, 15, -10, 10, 0] }
                  : {}
              }
              transition={{ duration: 0.4 }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(book, () => setOpen(true));
                }}
                sx={{
                  width: 35,
                  height: 35,
                  borderRadius: 999,
                  backgroundColor: isLoading ? "transparent" : "#D68B19",
                  "@media (hover: hover) and (pointer: fine)": {
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  },
                  "@media (hover: none) and (pointer: coarse)": {
                    "&:hover": {
                      backgroundColor: "#D68B19",
                      opacity: 0.8,
                    },
                  },

                  pointerEvents: loadItemsClick ? "none" : "auto",
                  // pointerEvents:
                  //   isLoading || loadingAction.type || loadItemsClick
                  //     ? "none"
                  //     : "auto",
                }}
              >
                {isLoading ? (
                  <BounceLoader
                    color={"#D68B19"}
                    loading
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <Icon
                    icon="mage:basket"
                    width="24"
                    height="24"
                    style={{ color: "white" }}
                  />
                )}
              </IconButton>
            </motion.div>
          </Box>
        </CardActions>

        {/* Sujets/Tags */}
        {book.subjects && book.subjects.length > 0 && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {book.subjects.slice(0, 2).map((subject: any, idx: any) => (
                <Chip
                  key={idx}
                  label={subject}
                  size="small"
                  sx={{
                    fontSize: "0.65rem",
                    height: "20px",
                    backgroundColor: "#F3F4F6",
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Card>
      <DrawerPanier open={open} setOpen={setOpen} />
    </>
  );
}
export default CardProduct;
