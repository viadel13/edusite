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

function FilterProductSwipper({ allBooks }: SpecialProductSwipper) {
  const bestSellingBooks = allBooks.filter((book) => {
    const salesThreshold = 1000; // Seuil des ventes
    const ratingThreshold = 4.5; // Note minimale
    const reviewCountThreshold = 50; // Nombre minimal de critiques

    return (
      (book?.salesCount ?? 0) >= salesThreshold &&
      book.rating >= ratingThreshold &&
      book.reviewCount >= reviewCountThreshold
    );
  });

  const test = allBooks.map((book, index) => {
    // Créer des paires de livres en prenant 2 livres à la fois
    if (index % 2 === 0) {
      const nextBook = allBooks[index + 1]; // Livre suivant pour faire une paire
      return (
        <Grid container spacing={2} key={index} mb={4}>
          {/* Premier livre de la paire */}
          <Grid size={{ xs: 6 }}>
            <Stack direction={"row"} spacing={2}>
              <Stack>
                <Image
                  alt={"coverBook"}
                  src={book.coverUrl}
                  width={5000}
                  height={5000}
                  style={{
                    height: "90px",
                    width: "90px",
                    objectFit: "cover",
                  }}
                  objectFit={"cover"}
                  draggable={false}
                />
              </Stack>

              <Stack alignSelf={"center"}>
                <Typography>{book.author}</Typography>
                <Typography>{book.title}</Typography>
                <Typography>{book.price} FRCFA</Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* Deuxième livre de la paire */}
          {nextBook && (
            <Grid size={{ xs: 6 }}>
              <Stack direction={"row"} spacing={2}>
                <Stack>
                  <Image
                    alt={"coverBook"}
                    src={nextBook.coverUrl}
                    width={5000}
                    height={5000}
                    style={{
                      height: "90px",
                      width: "90px",
                      objectFit: "cover",
                    }}
                    objectFit={"cover"}
                    draggable={false}
                  />
                </Stack>

                <Stack alignSelf={"center"}>
                  <Typography>{nextBook.author}</Typography>
                  <Typography>{nextBook.title}</Typography>
                  <Typography>{nextBook.price} FRCFA</Typography>
                </Stack>
              </Stack>
            </Grid>
          )}
        </Grid>
      );
    }
    return null;
  });

  const pairs: Book[][] = [];
  for (let i = 0; i < allBooks.length; i += 2) {
    pairs.push(allBooks.slice(i, i + 2));
  }

  const slides: Book[][][] = [];
  for (let i = 0; i < pairs.length; i += 3) {
    slides.push(pairs.slice(i, i + 3));
  }

  return (
    <>
      <Swiper
        watchSlidesProgress={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        slidesPerView={1} // Une slide complète à la fois
        // modules={[Autoplay]}
        className={styles.wrapperFilterProductSwipper}
      >
        {slides.map((slidePairs, slideIndex) => (
          <SwiperSlide
            className={styles.slideFilterProductSwipper}
            key={slideIndex}
          >
            <Stack spacing={8}>
              {slidePairs.map((pair, pairIndex) => (
                <Grid container key={pairIndex} spacing={8}>
                  {pair.map((book) => (
                    <Grid size={{ xs: 12, sm: 6, md: 6 }} key={book.id}>
                      <Stack direction="row" spacing={2}>
                        <Stack>
                          <Image
                            alt="coverBook"
                            src={book.coverUrl}
                            width={5000}
                            height={5000}
                            style={{
                              height: "90px",
                              width: "90px",
                              objectFit: "cover",
                            }}
                            draggable={false}
                          />
                        </Stack>

                        <Stack alignSelf="center">
                          <Typography>{book.author}</Typography>
                          <Typography>{book.title}</Typography>
                          <Typography>{book.price} FRCFA</Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
      {/*<Swiper*/}
      {/*  watchSlidesProgress={true}*/}
      {/*  autoplay={{*/}
      {/*    delay: 3500,*/}
      {/*    disableOnInteraction: false,*/}
      {/*  }}*/}
      {/*  slidesPerView={2}*/}
      {/*  modules={[Autoplay]}*/}
      {/*  className={styles.wrapperFilterProductSwipper}*/}
      {/*>*/}
      {/*  {allBooks.map((book) => {*/}
      {/*    return (*/}
      {/*      <SwiperSlide*/}
      {/*        className={styles.slideFilterProductSwipper}*/}
      {/*        key={book.id}*/}
      {/*      >*/}
      {/*        {test}*/}
      {/*      </SwiperSlide>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</Swiper>*/}
    </>
  );
}

export default FilterProductSwipper;
