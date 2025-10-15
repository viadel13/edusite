"use client";

import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
  Drawer,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { pages } from "@/constants/links";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { usePageLoader } from "@/contexts/PageLoaderContext";
import CloseIcon from "@mui/icons-material/Close";

interface DrawerListProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DrawerList({ open, setOpen }: DrawerListProps) {
  const pathname = usePathname(),
    router = useRouter(),
    { setLoadPage } = usePageLoader();

  const DrawerListPage = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen(false)}
      component="div"
    >
      <Stack
        p={2}
        direction={"row"}
        width={"100%"}
        justifyContent="space-between"
        alignItems={"center"}
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
        <IconButton onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <List>
        {pages.map((i, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{
                color: pathname === i.link ? "#D68B19" : "black",
                fontWeight: 600,
                fontSize: 18,
                textTransform: "capitalize",
                position: "relative",
                "&:after": {
                  content: pathname === i.link ? "'•'" : "none",
                  position: "absolute",
                  top: -8,
                  left: "30px",
                  transform: "translateX(-50%)",
                  fontSize: 24,
                  color: "#D68B19",
                },
              }}
              onClick={() => {
                if (pathname !== i.link) {
                  setLoadPage(true);
                  router.push(i.link);
                }
              }}
            >
              <ListItemText primary={i.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Stack alignItems={"start"} p={2}>
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
    </Box>
  );

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      {DrawerListPage}
    </Drawer>
  );
}

export default DrawerList;
