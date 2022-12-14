import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Image from "next/image";
import Particles from "../components/particles";
import "../styles/global.css";

const customTheme = extendTheme({
  shadows: { outline: "0 0 0 3px black" },
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },

  colors: {
    karpov: {
      100: "#12bd02",
      200: "#12bd02",
      300: "#12bd02",
      400: "#12bd02",
      500: "#12bd02",
      600: "#12bd02",
      700: "#12bd02",
      800: "#12bd02",
      900: "#12bd02",
    },
    markov: {
      100: "#cb793e",
      200: "#cb793e",
      300: "#cb793e",
      400: "#cb793e",
      500: "#cb793e",
      600: "#cb793e",
      700: "#cb793e",
      800: "#cb793e",
      900: "#cb793e",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
      <Particles />

      <Box position="fixed" top="0" left="0" zIndex={-10}>
        <Image
          alt="bagui"
          src="/assets/rock-top-left.svg"
          height={130}
          width={130}
        />
      </Box>

      <Box position="fixed" bottom="-5px" left="-26px" zIndex={-10}>
        <Image
          alt="bagui"
          src="/assets/rock-bottom-left.svg"
          height={130}
          width={130}
        />
      </Box>

      <Box position="fixed" bottom="-5px" right="0" zIndex={-10}>
        <Image
          alt="bagui"
          src="/assets/rock-bottom-right.svg"
          height={130}
          width={130}
        />
      </Box>

      <Box position="fixed" top="-5px" right="0" zIndex={-10}>
        <Image
          alt="bagui"
          src="/assets/rock-top-right.svg"
          height={130}
          width={130}
        />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
