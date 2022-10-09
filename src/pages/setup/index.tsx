import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  ScaleFade,
  Wrap,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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
  const [gold, setGold] = useState(5000);

  const [cards, setCards] = useState<CardProps[]>([
    {
      avatar: "frog",
      background: undefined,
      helmet: undefined,
      armor: undefined,
      weapon: undefined,
      id: guidGenerator(),
    },
  ]);
  const [weapons, setWeapons] = useState<any[]>([]);
  const [helmets, setHelmets] = useState<any[]>([]);
  const [chests, setChests] = useState<any[]>([]);
  const [backgrounds, setBackgrounds] = useState<any[]>([]);

  const [selected, setSelected] = useState<any>(false);
  const hasSelection = !!selected;

  const addCard = () => {
    const cardTemplate = {
      avatar: "frog",
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
    setCards(cards.filter((element) => element.id !== id));
  };

  useEffect(() => {
    gameRoom.send("askData", {});

    gameRoom.onMessage("sendData", ({ data }) => {
      console.log("chegou data");
      console.log({ data });

      setWeapons(Object.values(data.weapons));
      setHelmets(Object.values(data.heads));
      setChests(Object.values(data.chests));
      setBackgrounds(Object.values(data.backgrounds));
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
        background: card.background,
        weapon: card.weapon,
        armor: card.armor,
        helmet: card.helmet,
      }));
  }, [cards]);

  console.log({ finalSquad });

  const onBuy = (price: number) => {
    setGold(Math.max(0, gold - price));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="1700px"
      margin="0 auto"
    >
      <Box display="flex" justifyContent="center" alignItems="center" gap={100}>
        <Heading
          maxWidth="600px"
          textShadow="3px 3px 10px #bb0e98df"
          mt={12}
          size="lg"
        >
          Comandante, use seus recursos para recrutar tropas.
        </Heading>

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
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={4}
        marginTop={14}
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
                  onBuy(selected.price);
                  setCards(
                    cards.map((c) => {
                      if (card.id !== c.id) {
                        return c;
                      }

                      if (selected.type === "CHEST") {
                        return { ...c, armor: selected.name };
                      }
                      if (selected.type === "HEAD") {
                        return { ...c, helmet: selected.name };
                      }
                      if (selected.type === "weapon") {
                        return { ...c, weapon: selected.name };
                      }
                      if (selected.type === "background") {
                        return { ...c, background: selected.name };
                      }

                      const cardTemplate = {
                        avatar: "frog",
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
  );
}
