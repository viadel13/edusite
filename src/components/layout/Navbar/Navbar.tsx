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
import { Fragment, useRef, useState } from "react";
import DrawerList from "@/components/ui/DrawerList/DrawerList";
import { usePathname, useRouter } from "next/navigation";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Icon } from "@iconify/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { searchBooks } from "@/store/slices/booksThunks";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect } from "react";
import {
  selectLoadingSearchBooks,
  selectSearchResults,
} from "@/store/slices/booksSlice";
import {
  loadCartFromLocalStorage,
  selectCartCount,
} from "@/store/slices/cartSlice";

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: 2,
    top: -2,
    width: 22,
    height: 22,
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
    { setLoadPage } = usePageLoader(),
    pathname = usePathname(),
    router = useRouter(),
    [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null),
    openMenu = Boolean(anchorEl),
    [query, setQuery] = useState(""),
    [showResults, setShowResults] = useState(false),
    [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null),
    searchRef = useRef<HTMLDivElement>(null),
    dispatch = useAppDispatch(),
    results = useAppSelector(selectSearchResults),
    loadingSearch = useAppSelector(selectLoadingSearchBooks),
    cartCount = useAppSelector(selectCartCount);

  useEffect(() => {
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      if (value.trim().length > 0) {
        dispatch(searchBooks(value));
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 300);

    setTypingTimeout(timeout);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          backgroundColor: "rgb(245,249,245)",
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
                  flexDirection: "row",
                  alignItems: "center",
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
                    display: { xs: "flex", md: "flex", lg: "none" },
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
                  alignItems: "center",
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
                <Box
                  ref={searchRef}
                  sx={{
                    flexGrow: 1,
                    maxWidth: "100%",
                    position: "relative",
                    width: { xs: 300, sm: 350, md: 400 },
                  }}
                >
                  <TextField
                    placeholder="Rechercher un livre..."
                    value={query}
                    onChange={handleSearchChange}
                    onFocus={() => query && setShowResults(true)}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        height: "45px",
                        borderRadius: "5px",
                        backgroundColor: "white",
                      },
                    }}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 5,
                      top: "50%",
                      transform: "translateY(-50%)",
                      display: { md: "flex", lg: "none" },
                    }}
                  >
                    <Icon
                      icon="material-symbols-light:search"
                      width="20"
                      height="20"
                      style={{ color: "black" }}
                    />
                  </IconButton>

                  {/* Box des résultats */}
                  {showResults && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "48px",
                        left: 0,
                        width: "100%",
                        bgcolor: "white",
                        border: "1px solid rgba(108,117,125,0.4)",
                        borderRadius: "5px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        zIndex: 1000,
                        maxHeight: "250px",
                        overflowY: "auto",
                      }}
                    >
                      {loadingSearch ? (
                        <Typography
                          sx={{ p: 2, textAlign: "center", color: "gray" }}
                        >
                          Recherche en cours...
                        </Typography>
                      ) : results.length > 0 ? (
                        results.map((book) => (
                          <Box
                            key={book.id}
                            onMouseDown={() => {
                              // router.push(`/book/${book.id}`);
                              setShowResults(false);
                            }}
                            sx={{
                              px: 2,
                              py: 1,
                              cursor: "pointer",
                              "&:hover": { backgroundColor: "#f8f9fa" },
                            }}
                          >
                            <Typography variant="body1" fontWeight={500}>
                              {book.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {book.author?.join(", ")}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography
                          sx={{ p: 2, textAlign: "center", color: "gray" }}
                        >
                          Aucun résultat
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>

                <Button
                  variant={"contained"}
                  disableElevation
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
                  <Typography fontSize={15}>Rechercher</Typography>
                </Button>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack
                  sx={{
                    display: { xs: "none", sm: "none", md: "none", lg: "flex" },
                  }}
                >
                  <Button
                    id="basic-button"
                    aria-controls={openMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    endIcon={<KeyboardArrowDownIcon />}
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
                    <Box component="span">Mon Compte</Box>
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
                  sx={{
                    display: { xs: "flex", sm: "flex", md: "flex", lg: "none" },
                  }}
                >
                  <Icon
                    icon="solar:user-circle-outline"
                    width="30"
                    height="30"
                    style={{ color: "black" }}
                  />
                </IconButton>

                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Button
                    onClick={() => {
                      if (pathname !== "/panier") {
                        router.push("/panier");
                        setLoadPage(true);
                      }
                    }}
                    startIcon={
                      <StyledBadge badgeContent={cartCount} color="secondary">
                        <ShoppingCartIcon
                          sx={{
                            color: "black",
                          }}
                        />
                      </StyledBadge>
                    }
                  >
                    <Typography
                      sx={{
                        display: {
                          xs: "none",
                          sm: "none",
                          md: "none",
                          lg: "flex",
                        },
                        color: "black",
                      }}
                    >
                      Panier
                    </Typography>
                  </Button>
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
              <Box
                ref={searchRef}
                sx={{
                  flexGrow: 1,
                  maxWidth: "100%",
                  position: "relative",
                  width: { xs: 300, sm: 350, md: 400 },
                }}
              >
                <TextField
                  placeholder="Rechercher un livre..."
                  value={query}
                  onChange={handleSearchChange}
                  onFocus={() => query && setShowResults(true)}
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      height: "45px",
                      borderRadius: "5px",
                      backgroundColor: "white",
                    },
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <Icon
                    icon="material-symbols-light:search"
                    width="20"
                    height="20"
                    style={{ color: "black" }}
                  />
                </IconButton>

                {/* Box des résultats */}
                {showResults && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "48px",
                      left: 0,
                      width: "100%",
                      bgcolor: "white",
                      border: "1px solid rgba(108,117,125,0.4)",
                      borderRadius: "5px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      zIndex: 1000,
                      maxHeight: "250px",
                      overflowY: "auto",
                    }}
                  >
                    {loadingSearch ? (
                      <Typography
                        sx={{ p: 2, textAlign: "center", color: "gray" }}
                      >
                        Recherche en cours...
                      </Typography>
                    ) : results.length > 0 ? (
                      results.map((book) => (
                        <Box
                          key={book.id}
                          onMouseDown={() => {
                            // router.push(`/book/${book.id}`);
                            setShowResults(false);
                          }}
                          sx={{
                            px: 2,
                            py: 1,
                            cursor: "pointer",
                            "&:hover": { backgroundColor: "#f8f9fa" },
                          }}
                        >
                          <Typography variant="body1" fontWeight={500}>
                            {book.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {book.author?.join(", ")}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography
                        sx={{ p: 2, textAlign: "center", color: "gray" }}
                      >
                        Aucun résultat
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            </Stack>
          </Toolbar>
        </PageContainer>
      </AppBar>

      <DrawerList open={open} setOpen={setOpen} />
    </>
  );
}

export default Navbar;
