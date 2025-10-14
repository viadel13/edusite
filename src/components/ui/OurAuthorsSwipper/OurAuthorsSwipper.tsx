import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";

// Import Swiper styles
import "swiper/css";

import styles from "./styles.module.css";
import { Avatar, Stack, Typography, Chip } from "@mui/material";
import { Autoplay } from "swiper/modules";
import { Author } from "@/types/firestore.type";

type OurAuthorSwipperProps = {
  authors: Author[];
};

export default function OurAuthorsSwipper({ authors }: OurAuthorSwipperProps) {
  return (
    <>
      <Swiper
        watchSlidesProgress={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        slidesPerView={4}
        // modules={[Autoplay]}
        className={styles.wrapperOurAuthors}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },

          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },

          1024: {
            slidesPerView: 4,
            spaceBetween: 1,
          },

          1440: {
            slidesPerView: 4,
            spaceBetween: 1,
          },
        }}
      >
        {authors.map((author) => {
          return (
            <SwiperSlide className={styles.slideOurAuthors} key={author.id}>
              <Stack alignItems={"center"} spacing={2}>
                <Avatar
                  alt={author.name}
                  src={author.profileImage}
                  sx={{ width: { xs: 200 }, height: { xs: 200 } }}
                />
                <Stack spacing={2}>
                  <Typography textAlign={"center"}>{author.name}</Typography>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    alignItems={"center"}
                    justifyContent={"center"}
                    flexWrap="wrap"
                    gap={0.4}
                    width={200}
                  >
                    {author.categories.map((category, index) => (
                      <Stack
                        direction="row"
                        spacing={0.5}
                        key={index}
                        alignItems="center"
                      >
                        <Typography fontSize={14} color="#6c757d">
                          {category}
                        </Typography>
                        {author.categories.length > 1 &&
                          index < author.categories.length - 1 && (
                            <Typography fontSize={14} color="#6c757d">
                              -
                            </Typography>
                          )}
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
