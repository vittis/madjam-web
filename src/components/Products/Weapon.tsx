import {
  Box,
  Button,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { assetMap } from "../assetMap";

export default function Weapon({ weapon, onSelect, gold }: any) {
  return (
    <Popover key={weapon.name}>
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
                {weapon.price}
              </Box>

              <Image
                alt="icon"
                src={
                  /* @ts-ignore */
                  assetMap[weapon.name] || "/assets/character/frog.svg"
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
                <b>{weapon.name}</b>
              </Box>
              <Box paddingRight={6} display="flex" alignItems="center">
                <Box
                  marginRight={2}
                  textColor="#F9E006"
                  fontWeight="bold"
                  fontSize="2xl"
                >
                  {weapon.price}
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
                disabled={gold <= weapon.price}
                display="flex"
                marginTop={4}
                backgroundColor="green"
                _hover={{
                  backgroundColor: "var(--chakra-colors-green-800)",
                }}
                width="100%"
                onClick={() => {
                  onSelect({ ...weapon, type: "weapon" });
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
