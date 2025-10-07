"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./styles.module.css";

// import required modules
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import { Button, Stack, Typography } from "@mui/material";
import PageContainer from "@/components/layout/PageContainer/PageContainer";

export default function HeroSwipper() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        navigation={false}
        pagination={false}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className={styles.wrapperHero}
      >
        <SwiperSlide className={styles.slideHero}>
          <PageContainer
            sx={{
              backgroundColor: "#f2ebe1",
            }}
          >
            <Stack
              direction={"row"}
              width={"100%"}
              justifyContent="space-between"
              alignItems={"center"}
              spacing={10}
              sx={{
                paddingY: { xs: 2, sm: 4, md: 4, lg: 10 },
              }}
            >
              <Stack spacing={3}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "1em",
                      sm: "1.2em",
                      md: "1em",
                      lg: "1.2em",
                    },
                    color: "#495057",
                  }}
                >
                  Recevez 25% sur chaque livre
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#111111",
                    fontSize: {
                      xs: "1.8em",
                      sm: "2.2em",
                      md: "2.2em",
                      lg: "2.5em",
                    },
                  }}
                >
                  Collections de livres
                </Typography>{" "}
                <Stack alignItems={"start"} spacing={{ xs: 4, sm: 4, md: 8 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 18 },
                      color: "#495057",
                    }}
                  >
                    t is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of
                  </Typography>
                  <Button
                    disableElevation={true}
                    sx={{
                      backgroundColor: "#D68B19",
                      color: "white",
                      padding: "12px 35px",
                      textTransform: "uppercase",
                    }}
                  >
                    SHOP NOW
                  </Button>
                </Stack>
              </Stack>
              <Stack
                sx={{
                  display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
                }}
              >
                <Image
                  alt="Hero"
                  src="/images/imageHero1.png"
                  width={5000}
                  height={5000}
                  className={styles.slideImgHero}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  priority
                  draggable={false}
                />
              </Stack>
            </Stack>
          </PageContainer>
        </SwiperSlide>
        <SwiperSlide className={styles.slideHero}>
          <PageContainer
            sx={{
              backgroundColor: "#f2ebe1",
            }}
          >
            <Stack
              direction={"row"}
              width={"100%"}
              justifyContent="space-between"
              alignItems={"center"}
              spacing={10}
              sx={{
                paddingY: { xs: 2, sm: 4, md: 4, lg: 10 },
              }}
            >
              <Stack spacing={3}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "1em",
                      sm: "1.2em",
                      md: "1em",
                      lg: "1.2em",
                    },
                    color: "#495057",
                  }}
                >
                  Recevez 25% sur chaque livre
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    color: "#111111",
                    fontSize: {
                      xs: "1.8em",
                      sm: "2.2em",
                      md: "2.2em",
                      lg: "2.5em",
                    },
                  }}
                >
                  Collections de livres
                </Typography>{" "}
                <Stack alignItems={"start"} spacing={{ xs: 4, sm: 4, md: 8 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 18 },
                      color: "#495057",
                    }}
                  >
                    t is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of
                  </Typography>
                  <Button
                    disableElevation={true}
                    sx={{
                      backgroundColor: "#D68B19",
                      color: "white",
                      padding: "12px 35px",
                      textTransform: "uppercase",
                    }}
                  >
                    SHOP NOW
                  </Button>
                </Stack>
              </Stack>
              <Stack
                sx={{
                  width: "100%",
                  display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
                }}
              >
                <Image
                  alt="Hero"
                  src="/images/imgHero2HD.png"
                  width={5000}
                  height={5000}
                  className={styles.slideImgHero}
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                  priority
                  draggable={false}
                />
              </Stack>
            </Stack>
          </PageContainer>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
