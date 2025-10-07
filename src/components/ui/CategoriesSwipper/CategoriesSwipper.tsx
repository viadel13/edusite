import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";

// Import Swiper styles
import "swiper/css";

import styles from "./styles.module.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

interface CategoriesSwipperProps {
  books: any;
  selectedCategory: any;
  getRandomPrice: () => any;
  getRandomRating: () => any;
}

export default function CategoriesSwipper({
  books,
  getRandomPrice,
  getRandomRating,
  selectedCategory,
}: CategoriesSwipperProps) {
  return (
    <>
      <Swiper
        watchSlidesProgress={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        slidesPerView={3}
        modules={[Autoplay]}
        className={styles.wrapperBenfitsService}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },

          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

          1440: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {books.slice(0, 10).map((book, index) => (
          <SwiperSlide className={styles.slideBenfitsService}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
                position: "relative",
              }}
            >
              {/* Badge promo pour certains livres */}
              {index === 2 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "#DC2626",
                    color: "white",
                    px: 2,
                    py: 1,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    zIndex: 1,
                    clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                    width: "120px",
                  }}
                >
                  -33% OFF
                </Box>
              )}

              {/* Image de couverture */}
              <CardMedia
                component="img"
                image={book.coverUrl}
                alt={book.title}
                sx={{
                  height: 320,
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
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    lineHeight: 1.4,
                    mb: 1,
                    minHeight: "2.8em",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {book.title}
                </Typography>

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
                      fontSize: "1.25rem",
                    }}
                  >
                    ${getRandomPrice()}
                  </Typography>
                  {index === 2 && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#9CA3AF",
                        textDecoration: "line-through",
                      }}
                    >
                      ${(parseFloat(getRandomPrice()) * 1.5).toFixed(2)}
                    </Typography>
                  )}
                </Box>

                {/* Note */}
                <Rating
                  value={getRandomRating()}
                  readOnly
                  size="small"
                  sx={{ mb: 1 }}
                />

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
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: 0,
                    borderWidth: 2,
                    borderColor: "#D68B19",
                    fontWeight: 600,
                    "&:hover": {
                      borderWidth: 2,
                    },
                  }}
                >
                  View Details
                </Button>
              </CardActions>

              {/* Sujets/Tags */}
              {book.subjects && book.subjects.length > 0 && (
                <Box sx={{ px: 2, pb: 2 }}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {book.subjects.slice(0, 2).map((subject, idx) => (
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
