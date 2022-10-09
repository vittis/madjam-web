import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  ScaleFade,
  Text,
  Wrap,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { gameRoom } from "..";
import Card, { CardProps } from "../../components/Card/card";
import Armor from "../../components/Products/Armor";
import Background from "../../components/Products/Background";
import Weapon from "../../components/Products/Weapon";

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  // eslint-disable-next-line prettier/prettier
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export default function Setup() {
  const router = useRouter();
  const [gold, setGold] = useState(4000);

  const [cards, setCards] = useState<CardProps[]>([]);
  const [weapons, setWeapons] = useState<any[]>([]);
  const [helmets, setHelmets] = useState<any[]>([]);
  const [chests, setChests] = useState<any[]>([]);
  const [backgrounds, setBackgrounds] = useState<any[]>([]);

  const [selected, setSelected] = useState<any>(false);
  const hasSelection = !!selected;

  const [isRulesModalOpen, setIsRulesModalOpen] = useState<boolean>(false);
  const [myAnimal, setMyanimal] = useState("frog");

  const addCard = () => {
    const cardTemplate = {
      avatar: myAnimal,
      background: undefined,
      helmet: undefined,
      armor: undefined,
      weapon: undefined,
      id: guidGenerator(),
    };
    const newCard = { ...cardTemplate };
    setCards([...cards, newCard]);
  };

  const removeCard = (id: string) => {
    const card = cards.find((c) => c.id === id);
    setGold(
      gold +
        (card?.weapon?.price || 0) +
        (card?.armor?.price || 0) +
        (card?.helmet?.price || 0) +
        (card?.background?.price || 0)
    );

    setCards(cards.filter((element) => element.id !== id));
  };

  useEffect(() => {
    gameRoom.send("askData", {});

    gameRoom.onMessage("sendData", ({ data, myAnimal }) => {
      console.log("chegou data");
      console.log({ data });
      console.log({ myAnimal });
      setMyanimal(myAnimal?.toLowerCase() || "frog");

      setWeapons(Object.values(data.weapons));
      setHelmets(Object.values(data.heads));
      setChests(Object.values(data.chests));
      setBackgrounds(Object.values(data.backgrounds));
    });

    gameRoom.onMessage("startGame", (message) => {
      router.push(`/game`);
    });
  }, []);

  const onSelect = (equip: any) => {
    setSelected(equip);
  };

  const finalSquad = useMemo(() => {
    return cards
      .filter((c) => !!c.background)
      .map((card) => ({
        from: gameRoom.sessionId,
        background: card.background?.name,
        weapon: card.weapon?.name,
        armor: card.armor?.name,
        helmet: card.helmet?.name,
      }));
  }, [cards]);

  console.log({ finalSquad });

  const onBuy = (price: number) => {
    setGold(Math.max(0, gold - price));
  };

  const confirmDisabled =
    !!cards.every((c) => !!c.background && !!c.weapon) && cards.length !== 0;
  const canAddChar = gold > 430;

  const [confirmed, setConfirmed] = useState(false);
  const onClickConfirm = () => {
    setConfirmed(true);
    gameRoom.send("confirmSelection", { squad: finalSquad });
  };

  return (
    <>
      <Modal
        onClose={() => {}}
        closeOnOverlayClick={false}
        isOpen={confirmed}
        isCentered
        size="md"
      >
        <ModalOverlay />
        <ModalContent p={20} fontSize="2xl">
          Esperando o oponente... 😴
        </ModalContent>
      </Modal>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        maxWidth="1700px"
        margin="0 auto"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={100}
        >
          <Heading
            maxWidth="600px"
            textShadow="3px 3px 10px #bb0e98df"
            mt={12}
            size="lg"
          >
            Comandante, use seus recursos para recrutar tropas.{" "}
          </Heading>

          <ReactAudioPlayer src="/audio/selectMenu.mp3" autoPlay loop />

          <Flex alignItems="center" gap={3}>
            <Box
              marginRight={2}
              textColor="#F9E006"
              fontWeight="bold"
              fontSize="6xl"
              textShadow="0px 0px 3px #F9E006"
            >
              {gold}
            </Box>
            <Image
              alt="icon"
              src="/assets/other/coins.svg"
              height="100px"
              width="100px"
            />
          </Flex>

          <Button
            position="absolute"
            borderRadius="50%"
            right="0px"
            fontSize="32px"
            padding="30px 15px"
            colorScheme="purple"
            onClick={() => setIsRulesModalOpen(true)}
          >
            📖
          </Button>
          <Modal
            onClose={() => setIsRulesModalOpen(false)}
            closeOnOverlayClick={true}
            isOpen={isRulesModalOpen}
            isCentered
            size="2xl"
          >
            <ModalOverlay />
            <ModalContent
              padding="20px"
              backgroundColor="purple.900"
              fontWeight="bold"
            >
              <Text
                maxWidth="800px"
                //textShadow="3px 3px 10px #bb0e98df"
                //mt={12}
                size="sm"
              >
                Seja bem-vindo Comandante, irei explicar um pouco sobre o nosso
                combate.
              </Text>
              <Text
                maxWidth="800px"
                //textShadow="3px 3px 10px #bb0e98df"
                mt={6}
                size="sm"
              >
                Nessa primeira fase, você deve utilizar seus recursos para
                montar seu time. Basta selecionar o recurso que deseja adicionar
                e a tropa a qual ele será integrado. Você possui um limite de 5
                tropas, então conte bem seus recursos.
              </Text>
              <Text
                maxWidth="800px"
                //textShadow="3px 3px 10px #bb0e98df"
                mt={6}
                size="sm"
              >
                Existem 4 tipos de recursos: 🐱‍🚀 Tropas, ⚔ Armas, 🛡 Armaduras
                e ⛑ Capacetes, cada um com seus próprios preços e atributos. Os
                atributos são:
              </Text>
              <Text
                maxWidth="800px"
                //textShadow="3px 3px 10px #bb0e98df"
                mt={6}
                size="sm"
              >
                <Text as="span" color="red.400">
                  🩸 Dano
                </Text>{" "}
                - Quantidade de dano por ataque (mínimo ao máximo)
                <br />
                <Text as="span" color="red.400">
                  ❤ HP
                </Text>{" "}
                - Pontos de vida da tropa, se chegar a 0 ela morre
                <br />
                <Text as="span" color="blue.400">
                  🛡 Armadura
                </Text>{" "}
                - Pontos de vida da armadura, o{" "}
                <Text as="span" color="red.400">
                  🩸 Dano
                </Text>{" "}
                levado é tirado primeiro dela
                <br />
                <Text as="span" color="green.400">
                  🍃 Agilidade
                </Text>{" "}
                e{" "}
                <Text as="span" color="green.400">
                  🍃 Modificador de Agilidade
                </Text>{" "}
                - Modifica a velocidade na qual a tropa realiza suas ações
                (movimento e ataque), quanto maior, mais rápido
                <br />
                <Text as="span" color="orange.400">
                  🏋️‍♂️ Força
                </Text>{" "}
                e{" "}
                <Text as="span" color="gray.400">
                  🤺 Destreza
                </Text>{" "}
                - São atributos que concedem bônus no dano das armas, quando
                elas tiverem 🏋️‍♂️ Modificador de Força ou 🤺 Modificador de
                Destreza, o seu atributo será multiplicado pelo modificador e
                adicionado ao dano total
                <br />
                <Text as="span" color="red.400">
                  🔪 Penetração
                </Text>{" "}
                - Porcentagem do dano que atravessa a{" "}
                <Text as="span" color="blue.400">
                  🛡 Armadura
                </Text>{" "}
                e dá dano extra diretamente no{" "}
                <Text as="span" color="red.400">
                  ❤ HP
                </Text>{" "}
                do alvo
                <br />
                <Text as="span" color="blue.400">
                  🛡 Bônus vs Armadura
                </Text>{" "}
                - Porcentagem de dano extra em armadura
                <br />
                <Text as="span" color="yellow.400">
                  🎯 Alcance
                </Text>{" "}
                - Alcance dos ataques da arma
                <br />
                <Text as="span" color="yellow.800">
                  ⚖ Peso
                </Text>{" "}
                - Peso do equipamento. Pesos maiores dão penalidade na{" "}
                <Text as="span" color="green.400">
                  🍃 Agilidade
                </Text>{" "}
                da tropa. Até 5 de peso a tropa ganha um bônus de 30% de
                agilidade e acima de 12 de peso a tropa ganha uma penalidade de
                30% de agilidade
              </Text>
              <Text
                maxWidth="800px"
                //textShadow="3px 3px 10px #bb0e98df"
                mt={6}
                size="sm"
              >
                Após montar o seu time e{" "}
                <Text as="span" color="green.600">
                  Confirmar Esquadrão ✅
                </Text>
                , você entrará em combate contra o Comandante inimigo. Boa
                sorte!
              </Text>
            </ModalContent>
          </Modal>
        </Box>

        <Button
          onClick={onClickConfirm}
          disabled={!confirmDisabled}
          size="sm"
          boxShadow="outline"
          variant="ghost"
          colorScheme="green"
          backgroundColor="green.700"
          color="white"
          mt={3}
        >
          Confirmar Esquadrão ✅
        </Button>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={4}
          marginTop="20px"
          width="80%"
          height="268px"
        >
          {cards.map((card) => (
            <ScaleFade key={card.id} initialScale={0.2} in={true}>
              <Card
                id={card.id}
                avatar={card.avatar}
                background={card.background}
                helmet={card.helmet}
                weapon={card.weapon}
                armor={card.armor}
                removeCard={removeCard}
                hasSelection={hasSelection}
                onEquip={() => {
                  if (selected) {
                    const goldToDeduct = selected.price;

                    setCards(
                      cards.map((c) => {
                        if (card.id !== c.id) {
                          return c;
                        }

                        if (selected.type === "CHEST") {
                          if (card.armor) {
                            setGold(gold + card.armor.price - goldToDeduct);
                          } else {
                            setGold(gold - goldToDeduct);
                          }
                          return {
                            ...c,
                            armor: {
                              name: selected.name,
                              price: selected.price,
                            },
                          };
                        }
                        if (selected.type === "HEAD") {
                          if (card.helmet) {
                            setGold(gold + card.helmet.price - goldToDeduct);
                          } else {
                            setGold(gold - goldToDeduct);
                          }
                          return {
                            ...c,
                            helmet: {
                              name: selected.name,
                              price: selected.price,
                            },
                          };
                        }
                        if (selected.type === "weapon") {
                          if (card.weapon) {
                            setGold(gold + card.weapon.price - goldToDeduct);
                          } else {
                            setGold(gold - goldToDeduct);
                          }
                          return {
                            ...c,
                            weapon: {
                              name: selected.name,
                              price: selected.price,
                            },
                          };
                        }
                        if (selected.type === "background") {
                          if (card.background) {
                            setGold(
                              gold + card.background.price - goldToDeduct
                            );
                          } else {
                            setGold(gold - goldToDeduct);
                          }
                          return {
                            ...c,
                            background: {
                              name: selected.name,
                              price: selected.price,
                            },
                          };
                        }

                        const cardTemplate = {
                          avatar: myAnimal,
                          background: undefined,
                          helmet: undefined,
                          armor: undefined,
                          weapon: undefined,
                          id: guidGenerator(),
                        };

                        return cardTemplate;
                      })
                    );
                    setSelected(undefined);
                  }
                }}
              />
            </ScaleFade>
          ))}

          {cards.length <= 4 && (
            <Box
              width={220}
              height="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius={8}
              boxShadow="2xl"
            >
              <Button
                width="68px"
                height="68px"
                borderRadius="50%"
                fontSize="48px"
                colorScheme="pink"
                backgroundColor="pink"
                paddingBottom={2}
                disabled={!canAddChar}
                onClick={addCard}
              >
                +
              </Button>
            </Box>
          )}
        </Box>

        <Heading textShadow="0px 0px 4px #bb0e98df" size="md" mt={10}>
          {!hasSelection
            ? "Escolha algum recurso abaixo 👇"
            : "Escolha um recruta para equipar ☝"}
        </Heading>

        <Box
          marginTop={8}
          width="100%"
          display="flex"
          justifyContent="space-around"
        >
          <Box>
            <Box textShadow="0px 0px 3px #bb0e98df" fontSize={32}>
              🐱‍🚀 Tropas
            </Box>
            <Divider height={2}></Divider>
            <Wrap spacing={2} width="100%" marginTop={4} maxWidth="300px">
              {backgrounds
                .sort((a, b) => a.price - b.price)
                .map((background) => (
                  <Background
                    key={background.name}
                    background={background}
                    onSelect={onSelect}
                    gold={gold}
                    onBuy={onBuy}
                  />
                ))}
            </Wrap>
          </Box>

          <Box>
            <Box textShadow="0px 0px 3px #bb0e98df" fontSize={32}>
              ⚔ Armas
            </Box>
            <Divider height={2}></Divider>
            <Wrap spacing={2} width="100%" marginTop={4} maxWidth="300px">
              {weapons
                .sort((a, b) => a.price - b.price)
                .map((weapon) => (
                  <Weapon
                    key={weapon?.name}
                    weapon={weapon}
                    onSelect={onSelect}
                    gold={gold}
                    onBuy={onBuy}
                    /* disabled={gold <= weapon.price} */
                  />
                ))}
            </Wrap>
          </Box>

          <Box>
            <Box textShadow="0px 0px 3px #bb0e98df" fontSize={32}>
              🛡 Armaduras
            </Box>
            <Divider height={2}></Divider>
            <Wrap spacing={2} width="100%" marginTop={4} maxWidth="300px">
              {chests
                .sort((a, b) => a.price - b.price)
                .map((chest) => (
                  <Armor
                    key={chest?.name}
                    armor={chest}
                    onSelect={onSelect}
                    gold={gold}
                    onBuy={onBuy}
                  />
                ))}
            </Wrap>
          </Box>

          <Box>
            <Box textShadow="0px 0px 3px #bb0e98df" fontSize={32}>
              ⛑ Capacetes
            </Box>
            <Divider height={2}></Divider>
            <Wrap spacing={2} width="100%" marginTop={4} maxWidth="300px">
              {helmets
                .sort((a, b) => a.price - b.price)
                .map((helmet) => (
                  <Armor
                    key={helmet?.name}
                    armor={helmet}
                    onSelect={onSelect}
                    gold={gold}
                    onBuy={onBuy}
                  />
                ))}
            </Wrap>
          </Box>
        </Box>
      </Box>
    </>
  );
}
