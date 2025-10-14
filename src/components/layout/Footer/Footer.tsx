import { Box, Button, Stack, TextField } from "@mui/material";
import PageContainer from "@/components/layout/PageContainer/PageContainer";

function Footer() {
  return (
    <Box
      mt={{ xs: 8, sm: 15, md: 16 }}
      width="100%"
      height={{ xs: 200 }}
      sx={{
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "center",
        // alignItems: "center",
        // gap: 2,
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
            Souscrire
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
export default Footer;
