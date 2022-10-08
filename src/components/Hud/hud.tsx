import { Box } from "@chakra-ui/react";

export default function Hud() {
  return (
    <Box
      position="fixed"
      top="0"
      width="100%"
      height="200px"
      backgroundImage="/assets/other/hud.svg"
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
    ></Box>
  );
}
