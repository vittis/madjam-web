import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Particles from "../components/particles";
import { SocketProvider } from "../context/socketContext";
import "../styles/global.css";

const customTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
        <Particles />
      </ChakraProvider>
    </SocketProvider>
  );
}

export default MyApp;
