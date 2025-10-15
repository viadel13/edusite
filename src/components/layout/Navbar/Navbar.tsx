"use client";

import {
  AppBar,
  BadgeProps,
  Box,
  Button,
  IconButton,
  Stack,
  styled,
  TextField,
  Toolbar,
  Typography,
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Icon } from "@iconify/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 10,
    width: 22,
    height: 22,
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
    { setLoadPage } = usePageLoader(),
    [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null),
    openMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          backgroundColor: "white",
          paddingY: 2,
          height: "auto",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <PageContainer>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
              }}
            >
              <Stack
                sx={{
                  justifyContent: "flex-start",
                  display: { xs: "none", sm: "none", md: "flex" },
                }}
              >
                <Link href={"/"}>
                  <Image
                    alt={"Logo"}
                    src={"/logo.svg"}
                    width={160}
                    height={100}
                    style={{ height: "auto" }}
                    draggable={false}
                  />
                </Link>
              </Stack>

              <Stack
                sx={{
                  justifyContent: "flex-start",
                  display: { xs: "flex", sm: "flex", md: "none" },
                  flexDirection: "row",
                  gap: 2,
                }}
              >
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
                  <MenuIcon
                    fontSize="large"
                    sx={{
                      color: "black",
                    }}
                  />
                </IconButton>
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
              </Stack>

              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={1}
                sx={{
                  flexGrow: 1,
                  maxWidth: "100%",
                  position: "relative",
                  width: { xs: 300, sm: 350, md: 400 },
                  display: { xs: "none", sm: "flex" },
                }}
              >
                <TextField
                  sx={{
                    width: "100%",

                    "& .MuiOutlinedInput-root": {
                      height: "45px",
                      borderRadius: "5px",
                      boxShadow: "none",
                      border: "none",
                      backgroundColor: "white",
                      "&:hover": {
                        border: "1px solid rgba(0,0,0,0.3)",
                      },
                      "&.Mui-focused": {
                        border: "none",
                        boxShadow: "none",
                      },
                    },
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                    display: { xs: "flex", sm: "flex", md: "flex", lg: "none" },
                  }}
                >
                  <Icon
                    icon="material-symbols-light:search"
                    width="20"
                    height="20"
                    style={{ color: "black" }}
                  />
                </IconButton>

                <Button
                  variant={"contained"}
                  sx={{
                    height: "45px",
                    textTransform: "capitalize",
                    color: "white",
                    borderRadius: "5px",
                    padding: "12px 18px",
                    display: { xs: "none", sm: "none", md: "none", lg: "flex" },
                    backgroundColor: "#D68B19",
                  }}
                >
                  Rechercher
                </Button>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Stack sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
                  <Button
                    id="basic-button"
                    aria-controls={openMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    endIcon={
                      <KeyboardArrowDownIcon
                        sx={{
                          display: { xs: "none", sm: "none", md: "flex" },
                        }}
                      />
                    }
                    startIcon={
                      <Icon
                        icon="solar:user-circle-outline"
                        width="30"
                        height="30"
                        style={{ color: "black" }}
                      />
                    }
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={handleClick}
                    sx={{
                      fontWeight: "normal",
                      fontSize: { xs: 17 },
                      "& .MuiButton-startIcon": {
                        marginRight: "4px",
                      },
                      "& .MuiButton-endIcon": {
                        marginLeft: "1px",
                      },
                      color: "black",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        display: { xs: "none", sm: "none", md: "inline" },
                      }}
                    >
                      Mon Compte
                    </Box>
                  </Button>
                  <Menu
                    elevation={2}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        sx: {
                          minWidth: 220,
                        },
                      },
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>Connexion</MenuItem>
                    <MenuItem onClick={handleClose}>Inscription</MenuItem>
                    {/*<MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                  </Menu>
                </Stack>

                <IconButton
                  sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
                >
                  <Icon
                    icon="solar:user-circle-outline"
                    width="30"
                    height="30"
                    style={{ color: "black" }}
                  />
                </IconButton>

                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <StyledBadge badgeContent={4} color="secondary">
                    <IconButton>
                      <ShoppingCartIcon
                        sx={{
                          color: "black",
                        }}
                      />
                    </IconButton>
                  </StyledBadge>
                  <Typography
                    sx={{
                      display: { xs: "none", sm: "none", md: "flex" },
                      color: "black",
                    }}
                  >
                    Panier
                  </Typography>
                </Stack>
              </Box>
            </Box>
            {/*recherche pour mobile*/}
            <Stack
              direction={"row"}
              spacing={1}
              sx={{
                maxWidth: "100%",
                position: "relative",
                width: "100%",
                display: { xs: "flex", sm: "none" },
              }}
            >
              <TextField
                sx={{
                  width: "100%",

                  "& .MuiOutlinedInput-root": {
                    height: "45px",
                    borderRadius: "5px",
                    boxShadow: "none",
                    border: "none",
                    backgroundColor: "white",
                    "&:hover": {
                      border: "1px solid rgba(0,0,0,0.3)",
                    },
                    "&.Mui-focused": {
                      border: "none",
                      boxShadow: "none",
                    },
                  },
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  right: 5,
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: { xs: "flex", sm: "flex", md: "flex", lg: "none" },
                }}
              >
                <Icon
                  icon="material-symbols-light:search"
                  width="20"
                  height="20"
                  style={{ color: "black" }}
                />
              </IconButton>
            </Stack>

            {/*<Stack*/}
            {/*  direction={"row"}*/}
            {/*  alignItems={"center"}*/}
            {/*  spacing={{ xs: 2, sm: 3 }}*/}
            {/*>*/}
            {/*  <Fragment>*/}
            {/*    <StyledBadgeResponsive*/}
            {/*      badgeContent={4}*/}
            {/*      color="secondary"*/}
            {/*      sx={{ display: { xs: "flex", sm: "none" } }}*/}
            {/*    >*/}
            {/*      <IconButton*/}
            {/*        sx={{*/}
            {/*          width: 40,*/}
            {/*          height: 40,*/}
            {/*          borderRadius: "50%",*/}
            {/*          border: "1px solid #6c757d",*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        <ShoppingCartIcon fontSize="small" />*/}
            {/*      </IconButton>*/}
            {/*    </StyledBadgeResponsive>*/}
            {/*  </Fragment>*/}
            {/*  <IconButton*/}
            {/*    size="large"*/}
            {/*    aria-label="account of current user"*/}
            {/*    aria-controls="menu-appbar"*/}
            {/*    aria-haspopup="true"*/}
            {/*    onClick={toggleDrawer(true)}*/}
            {/*    sx={{*/}
            {/*      display: { xs: "flex", md: "none" },*/}
            {/*      padding: 0,*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <MenuIcon fontSize="large" />*/}
            {/*  </IconButton>*/}
            {/*</Stack>*/}
          </Toolbar>
        </PageContainer>
      </AppBar>

      <DrawerList open={open} setOpen={setOpen} />
    </>
  );
}

export default Navbar;
