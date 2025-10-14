import { Swiper, SwiperSlide } from "swiper/react";

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
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Autoplay } from "swiper/modules";
import { Book } from "@/types/firestore.type";
import { Icon } from "@iconify/react";

interface CategoriesSwipperProps {
  books: Book[];
  selectedCategory: any;
}

export default function CategoriesSwipper({
  books,
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
        className={styles.wrapperCategorie}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },

          370: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          992: {
            slidesPerView: 3,
            spaceBetween: 10,
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
        {books.slice(0, 10).map((book, index: number) => (
          <SwiperSlide className={styles.slideCategorie} key={book.id}>
            <Card
              sx={{
                width: "100%",

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
              {/*{index === 2 && (*/}
              {/*  <Box*/}
              {/*    sx={{*/}
              {/*      position: "absolute",*/}
              {/*      top: 0,*/}
              {/*      left: 0,*/}
              {/*      backgroundColor: "#DC2626",*/}
              {/*      color: "white",*/}
              {/*      px: 2,*/}
              {/*      py: 1,*/}
              {/*      fontSize: "0.75rem",*/}
              {/*      fontWeight: 700,*/}
              {/*      zIndex: 1,*/}
              {/*      clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",*/}
              {/*      width: "120px",*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    -33% OFF*/}
              {/*  </Box>*/}
              {/*)}*/}

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
                  <Rating
                    value={book.rating}
                    readOnly
                    size="small"
                    sx={{ mb: 1 }}
                  />
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
                  {/*{index === 2 && (*/}
                  {/*  <Typography*/}
                  {/*    variant="body2"*/}
                  {/*    sx={{*/}
                  {/*      color: "#9CA3AF",*/}
                  {/*      textDecoration: "line-through",*/}
                  {/*    }}*/}
                  {/*  >*/}
                  {/*    ${(parseFloat(getRandomPrice()) * 1.5).toFixed(2)}*/}
                  {/*  </Typography>*/}
                  {/*)}*/}
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
                    "&:hover": {
                      backgroundColor: "black",
                    },
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
                <IconButton
                  sx={{
                    width: 35,
                    height: 35,
                    borderRadius: 999,
                    backgroundColor: "#D68B19",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                >
                  <Icon
                    icon="mage:basket"
                    width="24"
                    height="24"
                    style={{ color: "white" }}
                  />
                </IconButton>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
