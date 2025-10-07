import {
  Container,
  ContainerProps,
  Stack,
  StackProps,
  SxProps,
} from "@mui/material";

export interface PageContainerProps extends StackProps {
  sxContainer?: SxProps;
  containerProps?: ContainerProps;
}

export function PageContainer({
  children,
  color,
  sxContainer,
  containerProps = {},
  ...props
}: PageContainerProps) {
  return (
    <Stack {...props}>
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 1, sm: 2, md: 6, lg: 12, xl: 0 },
          ...sxContainer,
        }}
        {...containerProps}
      >
        {children}
      </Container>
    </Stack>
  );
}

export default PageContainer;
