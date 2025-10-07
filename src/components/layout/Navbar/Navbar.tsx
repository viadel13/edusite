"use client";

import {
  AppBar,
  BadgeProps,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { pages } from "@/constants/links";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
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

function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "white",
        paddingY: 2,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
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
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map((page, index) => (
            <Button
              key={index}
              sx={{
                color: "black",
                fontSize: 18,
                textTransform: "capitalize",
              }}
            >
              {page.name}
            </Button>
          ))}
        </Box>
        <Stack direction={"row"} alignItems={"center"} spacing={3}>
          <StyledBadge badgeContent={4} color="secondary">
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
          <Button
            variant={"contained"}
            disableElevation={true}
            sx={{
              backgroundColor: "#D68B19",
              color: "white",
              padding: 1.5,
            }}
          >
            Authentification
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
