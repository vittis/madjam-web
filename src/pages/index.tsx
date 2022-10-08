import {
  Box,
  Button,
  Container,
  Heading,
  ToastId,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useWsClient } from "../context/socketContext";
import useSubscribe from "../context/useSubscribe";

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    ActionheroWebsocketClient: any;
  }
}

const Home: NextPage = () => {
  const toast = useToast();
  const matchmakingToast = useRef<ToastId>();
  //console.log("RENDER HOME");
  const { client } = useWsClient();
  const router = useRouter();

  useSubscribe("matchmaking", ({ message }: any) => {
    console.log("RECEBI MESSAGE DE GAME", { message });
    if (message.action === "start") {
      if (matchmakingToast.current) {
        toast.close(matchmakingToast.current);
      }
      router.push(`/game/${message.id}`);
    }
  });

  return (
    <>
      <Container centerContent>
        <Heading my={5} size="2xl">
          ✊ 🤚 ✌
        </Heading>

        <Box display="flex" gap={10}>
          <Button
            onClick={() => {
              client?.action("startMatchmaking", {}, (data: any) => {
                console.log({ data });
                if (data.ok && !data.gameHasStarted) {
                  matchmakingToast.current = toast({
                    title: "Matchmaking...",
                    status: "success",
                    duration: null,
                    isClosable: false,
                    position: "top-right",
                  });
                }
              });
            }}
          >
            Start Matchmaking
          </Button>

          <Button
            onClick={() => {
              client?.action("createRoom", {}, (data: any) => {});
            }}
          >
            Create room
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
