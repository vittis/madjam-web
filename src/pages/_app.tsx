import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Particles from "../components/particles";
import "../styles/global.css";

const customTheme = extendTheme({
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
      900: "#12bd02"
    }
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
      <Particles />
    </ChakraProvider>
  );
}

export default MyApp;
