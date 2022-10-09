import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from "@chakra-ui/react";
import Image from "next/image";
import { assetMap } from "../assetMap";

function Armor({ armor, onSelect, gold, onBuy }: any) {
  return (
    <Popover key={armor.name}>
      {({ onClose }) => (
        <>
          {/* @ts-ignore */}
          <PopoverTrigger>
            <Box
              width="68px"
              height="68px"
              cursor="pointer"
              border="solid 1px var(--chakra-colors-pink-300)"
              p={1}
              borderStyle="groove"
              borderRadius="5px"
              display="flex"
              justifyContent="center"
              transition="all 0.1s"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "outline",
                border: "none",
              }}
              _active={{ transform: "scale(1.25)" }}
              boxShadow="2xl"
              position="relative"
            >
              <Box
                zIndex={9}
                position="absolute"
                top="-2px"
                left="2px"
                textColor="#F9E006"
                fontWeight="bold"
                fontSize="xs"
              >
                {armor.price}
              </Box>
              <Image
                alt="icon"
                src={
                  /* @ts-ignore */
                  assetMap[armor.name] || "/assets/character/frog.svg"
                }
                height="68px"
                width="68px"
              />
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader display="flex" justifyContent="space-between">
              <Box fontSize="2xl">
                <b>{armor.name}</b>
              </Box>
              <Box paddingRight={6} display="flex" alignItems="center">
                <Box
                  marginRight={2}
                  textColor="#F9E006"
                  fontWeight="bold"
                  fontSize="2xl"
                >
                  {armor.price}
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
                🛡 Armadura: <b>{armor.armorHp}</b>
              </Box>

              <Box>
                🍃 Modificador de Agilidade: <b>{armor.quickness}%</b>
              </Box>
              <Box>
                🏋️‍♂️ Força:{" "}
                <b>
                  {armor.str >= 0 ? "+" : "-"}
                  {armor.str}
                </b>
              </Box>
              <Box>
                🤺 Destreza:{" "}
                <b>
                  {armor.dex >= 0 ? "+" : ""}
                  {armor.dex}
                </b>
              </Box>
              <Box>
                ⚖ Peso: <b>{armor.weight}</b>
              </Box>

              <Button
                disabled={gold <= armor.price}
                display="flex"
                marginTop={2}
                width="100%"
                backgroundColor="green"
                _hover={{
                  backgroundColor: "var(--chakra-colors-green-800)",
                }}
                onClick={() => {
                  onSelect({ ...armor, type: armor.slot });
                  onClose();
                }}
              >
                Comprar e Equipar
              </Button>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export default Armor;
