"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import styles from "./styles.module.css";

import { Autoplay } from "swiper/modules";
import { Book } from "@/types/firestore.type";

import CardProduct from "@/components/ui/Card/CardProduct/CardProduct";

export interface CategoriesSwipperProps {
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
            spaceBetween: 10,
          },

          992: {
            slidesPerView: 3,
            spaceBetween: 10,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 12,
          },

          1440: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
        }}
      >
        {books.slice(0, 10).map((book) => {
          return (
            <SwiperSlide className={styles.slideCategorie} key={book.id}>
              <CardProduct book={book} selectedCategory={selectedCategory} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
