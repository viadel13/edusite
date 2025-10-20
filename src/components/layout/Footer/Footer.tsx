"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import { pages } from "@/constants/links";
import { usePathname, useRouter } from "next/navigation";
import { usePageLoader } from "@/contexts/PageLoaderContext";

function Footer() {
  const router = useRouter(),
    pathname = usePathname(),
    { setLoadPage } = usePageLoader();

  return (
    <Box
      mt={{ xs: 16 }}
      // sx={{
      //   height: "100vh",
      //   position: "relative",
      // }}
    >
      <Box
        sx={{
          position: "relative",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Box
          width="100%"
          height={"auto"}
          sx={{
            backgroundColor: "#111111",
            position: "relative",
          }}
        >
          <Stack
            sx={{
              position: "absolute",
              top: "0",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 999,
            }}
          >
            <Box
              sx={{
                position: "relative",
                zIndex: 999,
                width: { xs: 300, sm: 350, md: 400 },
              }}
            >
              <TextField
                sx={{
                  width: "100%",

                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                    "&:hover": {
                      border: "1px solid rgba(0,0,0,0.3)",
                    },
                    "&.Mui-focused": {
                      border: "1px solid rgba(0,0,0,0.3)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    },
                  },
                }}
              />

              <Button
                variant={"contained"}
                disableElevation
                sx={{
                  textTransform: "uppercase",
                  color: "white",
                  borderRadius: "30px",
                  position: "absolute",
                  padding: "12px",
                  right: 5,
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "#D68B19",
                }}
              >
                <Typography fontSize={14}>Souscrire</Typography>
              </Button>
            </Box>
          </Stack>
          <PageContainer py={{ xs: 10, sm: 10, md: 12 }}>
            <Grid container spacing={{ xs: 5, sm: 5, md: 2 }}>
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <Stack spacing={2}>
                  <Link
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pathname !== "/") {
                        setLoadPage(true);
                        router.push("/");
                      }
                    }}
                  >
                    <Image
                      alt={"Logow"}
                      src={"/logow.svg"}
                      width={160}
                      height={100}
                      style={{ height: "auto" }}
                      draggable={false}
                    />
                  </Link>
                  <Typography
                    sx={{
                      color: "#6c757d",
                    }}
                  >
                    Lorem ipsum dolor sit amet, sed do lorem consectetur tempor
                    incididunt enim ad minim simply random text. It has
                    pieceveniam.
                  </Typography>
                </Stack>
              </Grid>

              <Grid
                size={{ xs: 12, sm: 12, md: 4 }}
                sx={{
                  justifyContent: { xs: "start", sm: "start", md: "center" },

                  display: "flex",
                }}
              >
                <Stack spacing={2}>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: { xs: 20 },
                    }}
                  >
                    Information du magasin
                  </Typography>

                  <Stack>
                    <Typography
                      sx={{
                        color: "#6c757d",
                      }}
                    >
                      Magasin Edusite
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                      }}
                    >
                      Cameroun Doula
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      color: "#6c757d",
                    }}
                  >
                    Fax:5655654558
                  </Typography>
                  <Typography
                    sx={{
                      color: "#6c757d",
                    }}
                  >
                    (+237) 696746857
                  </Typography>

                  <Typography
                    sx={{
                      color: "#6c757d",
                    }}
                  >
                    Email cm:shababizetre@gmail.com
                  </Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <Stack>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: { xs: 20 },
                      mb: 2,
                    }}
                  >
                    Liens rapides
                  </Typography>
                  {pages.map((page, index) => (
                    <Stack
                      key={index}
                      sx={{
                        alignItems: "start",
                      }}
                    >
                      <Button
                        key={index}
                        size={"small"}
                        sx={{
                          color: "#6c757d",
                          fontWeight: "normal",
                          fontSize: 18,
                          textTransform: "capitalize",
                        }}
                        onClick={() => {
                          if (pathname !== page.link) {
                            setLoadPage(true);
                            router.push(page.link);
                          }
                        }}
                      >
                        <Typography>{page.name}</Typography>
                      </Button>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </PageContainer>

          <Box
            sx={{
              borderTop: "1px solid #6c757d",
              mt: { xs: 0, sm: 0, md: 12 },
              py: 4,
              color: "#6c757d",
            }}
          >
            <Typography textAlign={"center"}>
              Propulsé par DevPro Book Store © 2025
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default Footer;
