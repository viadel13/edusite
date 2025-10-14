import React from "react";
import {
  Skeleton,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";

export const SkeletonProductByCategorie = () => {
  return (
    <Card sx={{ width: 345, maxWidth: "100%" }}>
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{
          height: { xs: 100, sm: 100, md: 200 },
        }}
      />
      <CardContent>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="80%" />
        <Stack mt={2} spacing={2}>
          <Stack>
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="text" width="25%" />
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="circular" width={30} height={30} />
          </Stack>
        </Stack>
        <Stack direction={"row"} mt={2} spacing={1}>
          <Skeleton variant="text" width="15%" />
          <Skeleton variant="text" width="15%" />
        </Stack>
      </CardContent>
    </Card>
  );
};

export const SkeletonSpecialProduct = () => {
  return (
    <>
      <Box
        display={"flex"}
        sx={{
          gap: 2,
          flexDirection: { xs: "column", sm: "row", md: "row" },
        }}
      >
        <Box>
          <Skeleton
            variant="rectangular"
            sx={{
              height: { xs: 120, sm: 200, md: 200 },
              width: { xs: 300, sm: 300, md: 300 },
            }}
          />
        </Box>

        <Stack spacing={2} alignSelf={{ xs: "start", sm: "end", md: "end" }}>
          <Skeleton
            variant="rectangular"
            width={150}
            height={10}
            sx={{
              borderRadius: 12,
            }}
          />
          <Skeleton
            variant="rectangular"
            width={150}
            height={10}
            sx={{
              borderRadius: 12,
            }}
          />

          <Stack spacing={0.8}>
            <Skeleton
              variant="rectangular"
              width={200}
              height={10}
              sx={{
                borderRadius: 12,
              }}
            />
            <Skeleton
              variant="rectangular"
              width={190}
              height={10}
              sx={{
                borderRadius: 12,
              }}
            />
            <Skeleton
              variant="rectangular"
              width={180}
              height={10}
              sx={{
                borderRadius: 12,
              }}
            />{" "}
            <Skeleton
              variant="rectangular"
              width={170}
              height={10}
              sx={{
                borderRadius: 12,
              }}
            />{" "}
            <Skeleton
              variant="rectangular"
              width={150}
              height={10}
              sx={{
                borderRadius: 12,
              }}
            />
          </Stack>

          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Skeleton
              variant="rectangular"
              width={100}
              height={20}
              sx={{
                borderRadius: 12,
              }}
            />
            <Skeleton variant="circular" width={20} height={20} />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export const SkeletonFilterProduct = () => {
  return (
    <>
      <Box
        display={"flex"}
        sx={{
          gap: 2,
          flexDirection: { xs: "column", sm: "row", md: "row" },
        }}
      >
        <Box>
          <Skeleton
            variant="rectangular"
            sx={{
              height: 100,
              width: 100,
            }}
          />
        </Box>

        <Stack spacing={2} alignSelf={{ xs: "start", sm: "end", md: "end" }}>
          <Stack spacing={0.8}>
            <Skeleton
              variant="rectangular"
              width={135}
              height={8}
              sx={{
                borderRadius: 12,
              }}
            />
            <Skeleton
              variant="rectangular"
              width={120}
              height={8}
              sx={{
                borderRadius: 12,
              }}
            />
            <Skeleton
              variant="rectangular"
              width={130}
              height={8}
              sx={{
                borderRadius: 12,
              }}
            />{" "}
            <Skeleton
              variant="rectangular"
              width={120}
              height={8}
              sx={{
                borderRadius: 12,
              }}
            />{" "}
            <Skeleton
              variant="rectangular"
              width={100}
              height={8}
              sx={{
                borderRadius: 12,
              }}
            />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
