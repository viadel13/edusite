import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";

// Import Swiper styles
import "swiper/css";

import styles from "./styles.module.css";
import { Paper, Stack, Typography } from "@mui/material";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import React from "react";

type DetailsImagesSwipperProps = {
  othersImagesUrl: string[];
};

export default function DetailsImagesSwipper({
  othersImagesUrl,
}: DetailsImagesSwipperProps) {
  return (
    <>
      <Swiper
        watchSlidesProgress={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        slidesPerView={3}
        // modules={[Autoplay]}
        className={styles.wrapperDetailsImagesSwipper}
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 1,
          },

          640: {
            slidesPerView: 4,
            spaceBetween: 1,
          },

          1024: {
            slidesPerView: 4,
            spaceBetween: 1,
          },

          1440: {
            slidesPerView: 5,
            spaceBetween: 1,
          },
        }}
      >
        {othersImagesUrl.map((url: string) => (
          <SwiperSlide className={styles.slideDetailsImagesSwipper}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: "2px",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "fit-content",
                p: "8px",
              }}
            >
              <Image
                alt="errorPage"
                src={url}
                width={5000}
                height={5000}
                style={{
                  height: 70,
                  width: 70,
                  objectFit: "cover",
                }}
                draggable={false}
              />
            </Paper>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
