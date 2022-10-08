import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ToastId,
  useToast,
  WrapItem,
} from "@chakra-ui/react";
import * as Colyseus from "colyseus.js";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

// ...

let client = new Colyseus.Client("ws://localhost:2567");

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    ActionheroWebsocketClient: any;
  }
}

const ANIMALS = {
  FROG: "🐸",
  BAT: "🦇",
  RAT: "🐭",
  LIZARD: "🦎",
  BIRD: "🐦",
  CRAB: "🦀",
};

const Home: NextPage = () => {
  const toast = useToast();
  const matchmakingToast = useRef<ToastId>();
  //console.log("RENDER HOME");
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [name, setName] = useState("");
  const [lobbyMembers, setLobbyMembers] = useState<any[]>([]);

  const lobbyRoom = useRef<Colyseus.Room>();

  useEffect(() => {
    const join = async () => {
      try {
        const room = await client.joinOrCreate<any>("lobby");
        console.log("joined successfully", room);

        room.onMessage("listRooms", async () => {
          console.log("listRooms");
          const rooms = await client.getAvailableRooms("gameRoom");
          console.log({ rooms });
        });

        room.onMessage("onStartGame", async (data) => {
          console.log({ data });
          console.log("REDIRECT START GAME PLS");
        });

        room.onStateChange((state) => {
          const members: any[] = [];
          state.players.forEach((value: any, key: any) => {
            members.push({
              id: key,
              name: value.name,
              animal: value.animal,
              isMatchmaking: value.isMatchmaking,
            });
          });

          console.log({ members });
          setLobbyMembers(members);
        });

        lobbyRoom.current = room;
      } catch (e) {
        console.error("join error", e);
      }
    };
    join();
  }, []);

  const isOnMatchmaking = !!lobbyMembers
    .filter((m) => !!m.isMatchmaking)
    .find((m) => m.id === lobbyRoom.current?.sessionId);

  return (
    <>
      <Modal
        onClose={() => {}}
        closeOnOverlayClick={false}
        isOpen={isModalOpen}
        isCentered
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="center" fontSize="3xl">
            Bem-vindo de volta, Comandante 🦸‍♂️
          </ModalHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              lobbyRoom.current?.send("setName", { name });
              setIsModalOpen(false);
              /* client?.action("setName", { name }, (data: any) => {
                console.log({ data });
                if (data.ok) {
                  setIsModalOpen(false);
                }
              }); */
            }}
          >
            <ModalBody
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              fontSize="xl"
              display="flex"
              flexDirection="column"
            >
              <Box>Como devo te chamar? 👀</Box>
              <Input
                placeholder="Nome"
                maxWidth="65%"
                value={name}
                onChange={(e) => setName(e.target.value)}
                mt={5}
              />
            </ModalBody>
            <ModalFooter display="flex" justifyContent="center">
              <Button type="submit" colorScheme="orange">
                Vem Monstro 💪
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      {!isModalOpen && (
        <Container centerContent>
          <Heading mt={8} mb={5} size="2xl">
            🐭🦀🐸🐦🦎🦇
          </Heading>

          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap={4}
            mt={4}
          >
            <>
              <Heading mb={6} size="md">
                É bom te ter de volta,{" "}
                <Box as="span" color="red.400">
                  {name}
                </Box>
              </Heading>

              <Button
                width="100%"
                size="lg"
                colorScheme="orange"
                disabled={
                  isOnMatchmaking ||
                  lobbyMembers?.filter((m) => m.isMatchmaking).length === 2
                }
                onClick={() => {
                  lobbyRoom.current?.send("setIsMatchmaking", {});
                }}
              >
                Buscar Partida
              </Button>

              <Heading mt="5" mb={1} size="lg">
                Hall da Fama 👑
              </Heading>
              {lobbyMembers
                .filter((p) => !!p.name)
                .map((player) => (
                  <Heading key={player.id} size="md">
                    {player.name} -{" "}
                    <Box as="span" color="darkorange">
                      {player.wins || 0} wins
                    </Box>
                  </Heading>
                ))}

              {lobbyMembers?.filter((m) => m.isMatchmaking).length > 0 && (
                <>
                  <Heading mt={4}>
                    Fila 🛰{" "}
                    <Box fontSize="lg" as="span" color="orange.400">
                      ({lobbyMembers?.filter((m) => m.isMatchmaking).length}/2)
                    </Box>
                  </Heading>
                  <Box
                    pt={0}
                    pb={4}
                    pl={4}
                    pr={4}
                    display="flex"
                    flexDirection="column"
                    borderWidth="2px"
                    borderRadius="md"
                  >
                    {lobbyMembers
                      ?.filter((m) => m.isMatchmaking)
                      ?.map((member) => (
                        <WrapItem
                          key={member.name}
                          display="flex"
                          p="2"
                          minW="210px"
                          fontSize="xl"
                          alignItems="center"
                        >
                          <Box fontSize="3xl" mr={2}>
                            {/* 
                      // @ts-ignore */}
                            {ANIMALS?.[member.animal] || "🐸"}
                          </Box>
                          <Box
                            fontWeight="bold"
                            as="span"
                            color={name === member.name ? "red.400" : "white"}
                          >
                            {member.name}
                          </Box>
                        </WrapItem>
                      ))}

                    {lobbyMembers?.filter((m) => m.isMatchmaking).length ===
                      2 &&
                      isOnMatchmaking && (
                        <Button
                          onClick={() => {
                            lobbyRoom.current?.send("startGame");
                          }}
                          mt={2}
                          variant="outline"
                          colorScheme="green"
                        >
                          Iniciar Jogo
                        </Button>
                      )}
                  </Box>
                </>
              )}
            </>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Home;
