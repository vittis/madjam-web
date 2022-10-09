import { Box, Button, Divider } from "@chakra-ui/react";
import Image from "next/image";

export interface CardProps {
  id?: string;
  avatar: string;
  background?: { name: string; price: number };
  weapon?: { name: string; price: number };
  armor?: { name: string; price: number };
  helmet?: { name: string; price: number };
  removeCard?: Function;
  hasSelection?: Boolean;
  onEquip?: Function;
}

export default function Card({
  id,
  avatar,
  background,
  weapon,
  armor,
  helmet,
  removeCard,
  hasSelection,
  onEquip,
}: CardProps) {
  return (
    <>
      <Box
        /* @ts-ignore */
        onClick={hasSelection ? onEquip : () => {}}
        pb={2}
        minWidth={200}
        maxWidth={200}
        height="100%"
        backgroundColor="#3E3B3B"
        border={
          hasSelection
            ? "solid 3px var(--chakra-colors-pink-300)"
            : "solid 3px black"
        }
        borderStyle="groove"
        borderRadius={8}
        transition="all 0.2s"
        _hover={
          hasSelection
            ? {
                boxShadow: "0 0 0 3px var(--chakra-colors-pink-300)",
                border: "solid 1px var(--chakra-colors-pink-300)",
                transform: "scale(1.05)",
              }
            : {}
        }
        boxShadow={"2xl"}
        position="relative"
        cursor={hasSelection ? "pointer" : "initial"}
      >
        {removeCard && (
          <Button
            size="sm"
            variant="ghost"
            position="absolute"
            right={0}
            onClick={() => removeCard(id)}
          >
            ❌
          </Button>
        )}
        {/* character avatar */}
        <Box
          display="flex"
          justifyContent="center"
          marginTop={6}
          position="relative"
        >
          <Box
            height={20}
            width={20}
            backgroundColor="#bb0e98df"
            borderRadius="50%"
          ></Box>
          <Box position="absolute" top="-6px" left="25%">
            <Image
              alt="rat"
              src={`/assets/character/${avatar}.svg`}
              height={100}
              width={100}
            ></Image>
          </Box>
        </Box>
        {background ? (
          <Box
            textShadow="0px 2px 1px var(--chakra-colors-purple-700)"
            textAlign="center"
            marginTop={4}
            height="24px"
            fontWeight="bold"
          >
            {background.name}
          </Box>
        ) : (
          <Box
            marginTop={4}
            textAlign="center"
            width="100%"
            height="24px"
            color="gray"
          >
            <Box px={3} as="b"></Box>
          </Box>
        )}

        <Box display="flex" justifyContent="center" marginTop={1} gap={4}>
          <Divider maxWidth="35%" height={2}></Divider>
          <Box
            height={2}
            width={2}
            marginTop="3px"
            backgroundColor="#bb0e98df"
            borderRadius="50%"
          ></Box>
          <Divider textAlign="center" maxWidth="35%" height={2}></Divider>
        </Box>
        <Box p={1} marginTop={3} fontSize="14px" lineHeight={7}>
          <Box display="flex" gap="1">
            <Box as="span" fontSize="16px">
              ⚔
            </Box>{" "}
            <Box
              fontSize="sm"
              textShadow="0px 2px 1px var(--chakra-colors-purple-700)"
              fontWeight="bold"
            >
              {weapon?.name}
            </Box>
          </Box>

          <Box display="flex" gap="1">
            <Box as="span" fontSize="16px">
              ⛑
            </Box>{" "}
            <Box
              fontSize="sm"
              textShadow="0px 2px 1px var(--chakra-colors-purple-700)"
              fontWeight="bold"
            >
              {helmet?.name}
            </Box>
          </Box>

          <Box display="flex" gap="1">
            <Box as="span" fontSize="16px">
              👕
            </Box>{" "}
            <Box
              fontSize="sm"
              textShadow="0px 2px 1px var(--chakra-colors-purple-700)"
              fontWeight="bold"
            >
              {armor?.name}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
