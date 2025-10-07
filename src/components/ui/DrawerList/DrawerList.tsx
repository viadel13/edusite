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
} from "@mui/material";
import { pages } from "@/constants/links";
import Link from "next/link";
import Image from "next/image";

interface DrawerListProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DrawerList({ open, setOpen }: DrawerListProps) {
  const DrawerListPage = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen(false)}
      component="div"
    >
      <Stack p={2}>
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
      <Divider />
      <List>
        {pages.map((i, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
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
