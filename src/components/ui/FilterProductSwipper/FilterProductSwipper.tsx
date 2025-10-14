import styles from "./styles.module.css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Book } from "@/types/firestore.type";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

interface SpecialProductSwipper {
  allBooks: Book[];
  selectedOption: number;
}

function FilterProductSwipper({
  allBooks,
  selectedOption,
}: SpecialProductSwipper) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // xs et sm
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  let linesPerSlide = 3; // par défaut desktop
  if (isMobile) {
    linesPerSlide = 2; // mobile et tablette → 2 lignes par slide
  }
  const newProducts = allBooks.filter((i) => i.isNew);
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

  const filterProduct = selectedOption === 30 ? bestSellingBooks : newProducts;

  const pairs: Book[][] = [];
  for (let i = 0; i < filterProduct.length; i += 2) {
    pairs.push(filterProduct.slice(i, i + 2));
  }

  const slides: Book[][][] = [];
  for (let i = 0; i < pairs.length; i += linesPerSlide) {
    slides.push(pairs.slice(i, i + linesPerSlide));
  }

  return (
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
          <Stack spacing={6}>
            {slidePairs.map((pair, pairIndex) => (
              <Grid container key={pairIndex} spacing={6}>
                {pair.map((book) => (
                  <Grid size={{ xs: 12, sm: 6, md: 6 }} key={book.id}>
                    <Stack direction="row" spacing={2} position={"relative"}>
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

                      <Stack
                        alignSelf="end"
                        spacing={0.3}
                        sx={{
                          position: "relative",
                          right: 0,
                          left: 0,
                          top: 20,
                        }}
                      >
                        <Typography color={"#6c757d"}>{book.author}</Typography>
                        <Typography>{book.title}</Typography>
                        <Typography color={"#6c757d"}>
                          {book.price} FRCFA
                        </Typography>
                        <Typography
                          sx={{
                            textTransform: "uppercase",
                            textDecoration: "underline",
                            fontSize: 12,
                          }}
                        >
                          ajouter au panier
                        </Typography>
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
  );
}

export default FilterProductSwipper;
