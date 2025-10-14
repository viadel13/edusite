import styles from "./styles.module.css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Book } from "@/types/firestore.type";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

interface SpecialProductSwipper {
  allBooks: Book[];
}

function SpecialProductSwipper({ allBooks }: SpecialProductSwipper) {
  const allBooksSuper = allBooks.filter((i) => i.tag === "special");

  return (
    <Swiper
      watchSlidesProgress={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      slidesPerView={1}
      spaceBetween={20}
      modules={[Autoplay]}
      className={styles.wrapperSpecialProduct}
    >
      {allBooksSuper.map((book) => {
        const priceDiscount =
          book.tag === "special" && book.discount
            ? book.price * (book.discount / 100)
            : 0;

        const finalPrice = book.price - priceDiscount;

        return (
          <SwiperSlide className={styles.slideSpecialProduct} key={book.id}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "#DC2626",
                    color: "white",
                    px: 1,

                    fontSize: "0.75rem",

                    fontWeight: 700,
                    zIndex: 1,
                    clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                    width: "190px",
                  }}
                >
                  <Typography fontSize={16}> -{book.discount}%</Typography>
                </Box>

                <Image
                  alt={"coverBook"}
                  src={book.coverUrl}
                  width={5000}
                  height={5000}
                  style={{
                    height: "250px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  objectFit={"cover"}
                  draggable={false}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <Stack spacing={4}>
                  <Typography fontSize={{ xs: 25 }}>{book.title}</Typography>
                  <Stack direction={"row"} spacing={1}>
                    <Typography>Nom de l'auteur:</Typography>
                    <Typography color={"#6c757d"}>{book.author}</Typography>
                  </Stack>
                  <Typography color={"#6c757d"}>{book.description}</Typography>
                  <Stack direction={"row"} spacing={2}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      style={{
                        textDecoration: priceDiscount ? "line-through" : "none",
                      }}
                    >
                      {book.price} FRCFA
                    </Typography>
                    {priceDiscount > 0 && (
                      <Typography variant="body1">
                        {finalPrice.toFixed(2)} FRCFA
                      </Typography>
                    )}
                  </Stack>
                  <Stack direction={"row"} spacing={1}>
                    <Button
                      disableElevation
                      variant={"contained"}
                      size={"small"}
                      sx={{
                        color: "white",
                        backgroundColor: "#D68B19",
                        textTransform: "uppercase",
                      }}
                    >
                      AJOUTER AU PANIER
                    </Button>
                    <IconButton
                      size={"small"}
                      sx={{
                        backgroundColor: "#f5f5f5",
                        "&:hover": {
                          backgroundColor: "black",
                          color: "white",
                        },
                        borderRadius: 2,
                      }}
                      className="icon-hover"
                    >
                      <Icon
                        icon="iconamoon:eye-light"
                        width="24"
                        height="24"
                        style={{
                          color: "black",
                        }}
                      />
                    </IconButton>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SpecialProductSwipper;
