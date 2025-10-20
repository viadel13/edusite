"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import styles from "./styles.module.css";
import { Paper, Stack, Typography } from "@mui/material";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import React, { useState } from "react";

type DetailsImagesSwipperProps = {
  othersImagesUrl: string[];
  onSelectImage?: (url: string) => void;
};

export default function DetailsImagesSwipper({
  othersImagesUrl,
  onSelectImage,
}: DetailsImagesSwipperProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleClick = (url: string) => {
    setSelectedImage(url);
    onSelectImage?.(url);
  };

  return (
    <>
      <Swiper
        watchSlidesProgress={true}
        navigation={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        slidesPerView={3}
        modules={[Navigation]}
        className={styles.wrapperDetailsImagesSwipper}
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 3,
          },

          500: {
            slidesPerView: 3,
            spaceBetween: 3,
          },

          899: {
            // 👈 au-delà de 898px
            slidesPerView: 3,
            spaceBetween: 3,
          },

          // 640: {
          //   slidesPerView: 3,
          //   spaceBetween: 3,
          // },

          1024: {
            slidesPerView: 3,
            spaceBetween: 3,
          },

          1440: {
            slidesPerView: 4,
            spaceBetween: 3,
          },
        }}
      >
        {othersImagesUrl.map((url: string, index: number) => (
          <SwiperSlide
            className={styles.slideDetailsImagesSwipper}
            key={index}
            onClick={() => handleClick(url)}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: "2px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "fit-content",
                p: "8px",
                border:
                  selectedImage === url
                    ? "2px solid #d68b19"
                    : "2px solid transparent",
                transition: "border 0.2s ease-in-out",
                cursor: "pointer",
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
