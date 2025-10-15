"use client";

import {
  AppBar,
  BadgeProps,
  Box,
  Button,
  IconButton,
  Stack,
  styled,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { pages } from "@/constants/links";
import PageContainer from "@/components/layout/PageContainer/PageContainer";
import MenuIcon from "@mui/icons-material/Menu";
import { Fragment, useState } from "react";
import DrawerList from "@/components/ui/DrawerList/DrawerList";
import { usePathname, useRouter } from "next/navigation";
import { usePageLoader } from "@/contexts/PageLoaderContext";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: 3,
    top: 13,
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: `2px solid #D68B19`,
    padding: "0 4px",
    backgroundColor: "#D68B19",
  },
}));

const StyledBadgeResponsive = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: 3,
    top: 13,
    width: 20,
    height: 20,
    borderRadius: "50%",
    border: `2px solid #D68B19`,
    padding: "0 4px",
    backgroundColor: "#D68B19",
  },
}));

function Navbar() {
  const [open, setOpen] = useState(false),
    toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    },
    router = useRouter(),
    pathname = usePathname(),
    { setLoadPage } = usePageLoader();

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: "white",
          paddingY: 2,
          height: "80px",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <PageContainer>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Fragment>
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <Link href={"/"}>
                  <Image
                    alt={"Logo"}
                    src={"/logo.svg"}
                    width={179}
                    height={100}
                    style={{ height: "auto" }}
                    draggable={false}
                  />
                </Link>
              </Box>
              <Box
                sx={{
                  display: { xs: "flex", sm: "none" },
                }}
              >
                <Link href={"/"}>
                  <Image
                    alt={"Logo"}
                    src={"/logo.svg"}
                    width={130}
                    height={100}
                    style={{ height: "auto" }}
                    draggable={false}
                  />
                </Link>
              </Box>
            </Fragment>
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={1}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {pages.map((page, index) => (
                <Button
                  key={index}
                  sx={{
                    color: pathname === page.link ? "#D68B19" : "black",
                    fontWeight: "normal",
                    fontSize: 18,
                    textTransform: "capitalize",
                    position: "relative",
                    "&:after": {
                      content: pathname === page.link ? "'•'" : "none",
                      position: "absolute",
                      top: -15,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 24,
                      color: "#D68B19",
                    },
                  }}
                  onClick={() => {
                    if (pathname !== page.link) {
                      setLoadPage(true);
                      router.push(page.link);
                    }
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={{ xs: 2, sm: 3 }}
            >
              <Fragment>
                <StyledBadge
                  badgeContent={4}
                  color="secondary"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  <IconButton
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      border: "1px solid #6c757d",
                    }}
                  >
                    <ShoppingCartIcon fontSize="small" />
                  </IconButton>
                </StyledBadge>
                <StyledBadgeResponsive
                  badgeContent={4}
                  color="secondary"
                  sx={{ display: { xs: "flex", sm: "none" } }}
                >
                  <IconButton
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      border: "1px solid #6c757d",
                    }}
                  >
                    <ShoppingCartIcon fontSize="small" />
                  </IconButton>
                </StyledBadgeResponsive>
              </Fragment>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                sx={{
                  display: { xs: "flex", md: "none" },
                  padding: 0,
                }}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Button
                variant={"contained"}
                disableElevation={true}
                sx={{
                  backgroundColor: "#D68B19",
                  color: "white",
                  padding: 1.5,
                  display: { xs: "none", md: "flex" },
                }}
              >
                Authentification
              </Button>
            </Stack>
          </Toolbar>
        </PageContainer>
      </AppBar>

      <DrawerList open={open} setOpen={setOpen} />
    </>
  );
}

export default Navbar;
