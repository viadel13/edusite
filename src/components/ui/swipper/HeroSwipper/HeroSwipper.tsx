"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.css";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Button, Stack, Typography } from "@mui/material";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import { useRouter } from "next/navigation";

export default function HeroSwipper() {
  const { setLoadPage } = usePageLoader();
  const router = useRouter();

  const handleShopNow = () => {
    setLoadPage(true);
    router.push("/categories");
  };

  return (
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
      {["/images/imageHero1.png", "/images/imgHero2HD.png"].map((imgSrc) => (
        <SwiperSlide className={styles.slideHero} key={imgSrc}>
          <PageContainer
            sx={{
              backgroundColor: imgSrc.includes("imageHero1") ? "#f2ebe1" : "#c8dcdb",
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
                  Profitez de 25% de réduction sur chaque livre
                </Typography>
                <Typography
                  sx={{
                    color: "#111111",
                    fontSize: {
                      xs: "1.5em",
                      sm: "2.2em",
                      md: "2.2em",
                      lg: "2.5em",
                    },
                  }}
                >
                  Découvrez nos collections de livres
                </Typography>
                <Stack alignItems={"start"} spacing={{ xs: 4, sm: 4, md: 8 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 16, sm: 18 },
                      color: "#495057",
                    }}
                  >
                    Des romans captivants aux ouvrages pédagogiques, explorez des
                    titres soigneusement sélectionnés pour enrichir votre culture.
                  </Typography>
                  <Button
                    onClick={handleShopNow}
                    disableElevation
                    sx={{
                      backgroundColor: "#D68B19",
                      color: "white",
                      padding: { xs: "5px 10px", sm: "12px 35px" },
                      textTransform: "uppercase",
                      fontSize: { xs: 12, sm: 15 },
                    }}
                  >
                    <Typography fontSize={14}>Acheter maintenant</Typography>
                  </Button>
                </Stack>
              </Stack>
              <Stack
                sx={{
                  display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
                }}
              >
                <Image
                  alt="Bannière Edusite"
                  src={imgSrc}
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
      ))}
    </Swiper>
  );
}
