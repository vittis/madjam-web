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

export default function Background({ background, onSelect, gold, onBuy }: any) {
  return (
    <Popover key={background.name}>
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
              borderRadius={4}
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
                {background.price}
              </Box>
              <Image
                alt="icon"
                src={
                  /* @ts-ignore */
                  assetMap[background.name] || "/assets/character/frog.svg"
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
                <b>{background.name}</b>
              </Box>
              <Box paddingRight={6} display="flex" alignItems="center">
                <Box
                  marginRight={2}
                  textColor="#F9E006"
                  fontWeight="bold"
                  fontSize="2xl"
                >
                  {background.price}
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
                🩸 HP : <b>{background.hp}</b>
              </Box>

              <Box>
                🍃 Agilidade: <b>{background.quickness}%</b>
              </Box>
              <Box>
                🏋️‍♂️ Força:{" "}
                <b>
                  {background.str >= 0 ? "+" : "-"}
                  {background.str}
                </b>
              </Box>
              <Box>
                🤺 Destreza:{" "}
                <b>
                  {background.dex >= 0 ? "+" : ""}
                  {background.dex}
                </b>
              </Box>

              <Button
                disabled={gold <= background.price}
                display="flex"
                marginTop={2}
                backgroundColor="green"
                _hover={{
                  backgroundColor: "var(--chakra-colors-green-800)",
                }}
                width="100%"
                onClick={() => {
                  onSelect({ ...background, type: "background" });
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
