import {
  Box,
  Button,
  Divider,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { gameRoom } from "..";
import Card, { CardProps } from "../../components/Card/card";

const card1 = {
  avatar: "rat",
  background: "noble",
  helmet: "paper",
  armor: "leather",
  weapon: "sword",
};

export default function Setup() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [weapons, setWeapons] = useState<any[]>([]);
  const [helmets, setHelmets] = useState<any[]>([]);
  const [chests, setChests] = useState<any[]>([]);

  const addCard = () => {
    const newCard = { ...card1, index: cards.length };
    setCards([...cards, newCard]);
  };

  const removeCard = (index: number) => {
    const newCards = cards.map((card, index) => ({
      ...card,
      index: index,
    }));
    setCards(newCards.filter((element) => element.index !== index));
  };

  useEffect(() => {
    gameRoom.send("askData", {});

    gameRoom.onMessage("sendData", ({ data }) => {
      console.log("chegou data");
      console.log({ data });

      setWeapons(Object.values(data.weapons));
      setHelmets(Object.values(data.heads));
    });
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={4}
        marginTop={20}
        width="80%"
        height="280px"
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            index={index}
            avatar={card.avatar}
            background={card.background}
            helmet={card.helmet}
            weapon={card.weapon}
            armor={card.armor}
            removeCard={removeCard}
          />
        ))}

        {cards.length <= 4 && (
          <Box
            width={220}
            height="100%"
            border="solid 3px #3389AD"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius={8}
            _hover={{ boxShadow: "outline" }}
            boxShadow="2xl"
          >
            <Button
              width="80px"
              height="80px"
              borderRadius="50%"
              fontSize="48px"
              backgroundColor="green"
              paddingBottom={2}
              onClick={addCard}
            >
              +
            </Button>
          </Box>
        )}
      </Box>
      <Box
        marginTop={8}
        width="100%"
        display="flex"
        justifyContent="space-around"
      >
        <Box>
          <Box fontSize={32}>👨‍🌾 Profissão</Box>
          <Divider height={2}></Divider>
          <SimpleGrid columns={5} spacing={2} width="100%" marginTop={4}>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
          </SimpleGrid>
        </Box>
        <Box>
          <Box fontSize={32}>⚔ Armas</Box>
          <Divider height={2}></Divider>
          <SimpleGrid columns={5} spacing={2} width="100%" marginTop={4}>
            {weapons.map((weapon) => (
              <Popover key={weapon.name}>
                {/* @ts-ignore */}
                <PopoverTrigger>
                  <Box
                    width="60px"
                    height="60px"
                    cursor="pointer"
                    backgroundColor="rgba(174, 174, 174, .67)"
                    border="solid 2px #3389AD"
                    borderRadius="5px"
                    display="flex"
                    justifyContent="center"
                  >
                    <Image
                      alt="icon"
                      src="/assets/weapon/shortBow.svg"
                      height="60px"
                      width="60px"
                    />
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader display="flex" justifyContent="space-between">
                    <Box fontSize="2xl">
                      <b>{weapon.name}</b>
                    </Box>
                    <Box paddingRight={6} display="flex" alignItems="center">
                      <Box
                        marginRight={2}
                        textColor="#F9E006"
                        fontWeight="bold"
                        fontSize="2xl"
                      >
                        50
                      </Box>
                      <Image
                        alt="icon"
                        src="/assets/other/coins.svg"
                        height="30px"
                        width="30px"
                      />
                    </Box>
                  </PopoverHeader>
                  <PopoverBody>
                    <Box>
                      🩸 Dano:{" "}
                      <b>
                        {weapon.damage.min} - {weapon.damage.max}
                      </b>
                    </Box>
                    <Box>
                      🔪 Penetração: <b>{weapon.penetration}%</b>
                    </Box>
                    <Box>
                      🛡 Bônus vs Armadura: <b>{weapon.armorShred}%</b>
                    </Box>
                    <Box>
                      🍃 Modificador de Agilidade: <b>{weapon.quickness}%</b>
                    </Box>
                    <Box>
                      🏋️‍♂️ Modificador de Força: <b>{weapon.strScale}</b>
                    </Box>
                    <Box>
                      🤺 Modificador de Destreza: <b>{weapon.dexScale}</b>
                    </Box>
                    <Box>
                      🎯 Alcance: <b>{weapon.atkRange}</b>
                    </Box>
                    <Box>
                      ⚖ Peso: <b>{weapon.weight}</b>
                    </Box>

                    <Button
                      display="flex"
                      marginTop={4}
                      backgroundColor="green"
                      width="100%"
                    >
                      Comprar e Equipar
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ))}
          </SimpleGrid>
        </Box>
        <Box>
          <Box fontSize={32}>⛑ Capacetes</Box>
          <Divider height={2}></Divider>
          <SimpleGrid columns={5} spacing={2} width="100%" marginTop={4}>
            {helmets.map((helmet) => (
              <Popover key={helmet.name}>
                {/* @ts-ignore */}
                <PopoverTrigger>
                  <Box
                    width="60px"
                    height="60px"
                    cursor="pointer"
                    backgroundColor="rgba(174, 174, 174, .67)"
                    border="solid 2px #3389AD"
                    borderRadius="5px"
                    display="flex"
                    justifyContent="center"
                  >
                    <Image
                      alt="icon"
                      src="/assets/weapon/shortBow.svg"
                      height="60px"
                      width="60px"
                    />
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader display="flex" justifyContent="space-between">
                    <Box fontSize="2xl">
                      <b>{helmet.name}</b>
                    </Box>
                    <Box paddingRight={6} display="flex" alignItems="center">
                      <Box
                        marginRight={2}
                        textColor="#F9E006"
                        fontWeight="bold"
                        fontSize="2xl"
                      >
                        50
                      </Box>
                      <Image
                        alt="icon"
                        src="/assets/other/coins.svg"
                        height="30px"
                        width="30px"
                      />
                    </Box>
                  </PopoverHeader>
                  <PopoverBody>
                    <Box>
                      🩸 HP Armadura: <b>{helmet.armorHp}</b>
                    </Box>

                    <Box>
                      🍃 Modificador de Agilidade: <b>{helmet.quickness}%</b>
                    </Box>
                    <Box>
                      🏋️‍♂️ Força:{" "}
                      <b>
                        {helmet.str >= 0 ? "+" : "-"}
                        {helmet.str}
                      </b>
                    </Box>
                    <Box>
                      🤺 Destreza:{" "}
                      <b>
                        {helmet.dex >= 0 ? "+" : ""}
                        {helmet.dex}
                      </b>
                    </Box>
                    <Box>
                      ⚖ Peso: <b>{helmet.weight}</b>
                    </Box>

                    <Button
                      display="flex"
                      marginTop={2}
                      backgroundColor="green"
                      width="100%"
                    >
                      Comprar e Equipar
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ))}
          </SimpleGrid>
        </Box>
        <Box>
          <Box fontSize={32}>🛡 Armaduras</Box>
          <Divider height={2}></Divider>
          <SimpleGrid columns={5} spacing={2} width="100%" marginTop={4}>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
            <Box bg="tomato" width="60px" height="60px"></Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}
