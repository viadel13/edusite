import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";

// Import Swiper styles
import "swiper/css";

import styles from "./styles.module.css";
import { Stack, Typography } from "@mui/material";
import { Autoplay } from "swiper/modules";

export default function BenefitsServiceSwipper() {
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
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        <SwiperSlide className={styles.slideBenfitsService}>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <Icon icon="iconamoon:delivery-free-thin" width="90" height="90" />
            <Stack spacing={0.4}>
              <Typography
                fontSize={{ xs: 19, sm: 19, md: 21 }}
                color={"#1c1c1c"}
              >
                Livraison gratuite
              </Typography>
              <Typography fontSize={{ xs: 14, md: 15 }} color={"#707070"}>
                Livraison gratuite, rapide et fiable sur plus de commandes
              </Typography>
            </Stack>
          </Stack>
        </SwiperSlide>
        <SwiperSlide className={styles.slideBenfitsService}>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <Icon icon="material-symbols-light:call" width="90" height="90" />
            <Stack spacing={0.4}>
              <Typography
                fontSize={{ xs: 19, sm: 19, md: 21 }}
                color={"#1c1c1c"}
              >
                {`Centre d'aide 24h/24 et 7j/7`}
              </Typography>
              <Typography fontSize={{ xs: 14, md: 15 }} color={"#707070"}>
                {`N'hésitez pas à nous appeler et obtenez le meilleur service d'assistance`}
              </Typography>
            </Stack>
          </Stack>
        </SwiperSlide>
        <SwiperSlide className={styles.slideBenfitsService}>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <Icon icon="iconoir:shopping-bag" width="90" height="90" />
            <Stack spacing={0.4}>
              <Typography
                fontSize={{ xs: 19, sm: 19, md: 21 }}
                color={"#1c1c1c"}
              >
                Achetez avec notre application
              </Typography>
              <Typography fontSize={{ xs: 14, md: 15 }} color={"#707070"}>
                Un moyen sûr, plus rapide et plus sécurisé de payer en ligne
                avec nous
              </Typography>
            </Stack>
          </Stack>
        </SwiperSlide>
        <SwiperSlide className={styles.slideBenfitsService}>
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <Icon icon="mdi:encryption-secure-outline" width="90" height="90" />
            <Stack spacing={0.4}>
              <Typography
                fontSize={{ xs: 19, sm: 19, md: 21 }}
                color={"#1c1c1c"}
              >
                Paiement sécurisé
              </Typography>
              <Typography fontSize={{ xs: 14, md: 15 }} color={"#707070"}>
                Parrainez un ami sur votre site Web et recevez un cadeau
                surprise
              </Typography>
            </Stack>
          </Stack>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
