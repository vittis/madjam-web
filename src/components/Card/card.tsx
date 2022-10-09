import { Box, Button, Divider } from "@chakra-ui/react";
import Image from "next/image";

export interface CardProps {
  index?: number;
  avatar: string;
  background: string;
  weapon: string;
  armor: string;
  helmet: string;
  removeCard?: Function;
}

export default function Card({
  index,
  avatar,
  background,
  weapon,
  armor,
  helmet,
  removeCard,
}: CardProps) {
  return (
    <>
      <Box
        width={220}
        height="100%"
        backgroundColor="#3E3B3B"
        border="solid 3px #3389AD"
        borderRadius={8}
        _hover={{ boxShadow: "outline" }}
        boxShadow="2xl"
        position="relative"
      >
        {removeCard && (
          <Button
            size="sm"
            variant="ghost"
            position="absolute"
            right={0}
            onClick={() => removeCard(index)}
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
            backgroundColor="#4AB3EE"
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
        <Box textAlign="center" marginTop={4}>
          {background}
        </Box>
        <Box display="flex" justifyContent="center" marginTop={1} gap={4}>
          <Divider maxWidth="35%" height={2}></Divider>
          <Box
            height={2}
            width={2}
            marginTop="3px"
            backgroundColor="#4AB3EE"
            borderRadius="50%"
          ></Box>
          <Divider textAlign="center" maxWidth="35%" height={2}></Divider>
        </Box>
        <Box marginLeft={8} marginTop={3} fontSize="14px" lineHeight={7}>
          <Box>
            <Box as="span" fontSize="16px">
              🗡
            </Box>{" "}
            {weapon}
          </Box>
          <Box>
            <Box as="span" fontSize="16px">
              🎓
            </Box>
            {"  "}
            {helmet}
          </Box>
          <Box>
            <Box as="span" fontSize="16px">
              🧥
            </Box>
            {"  "}
            {armor}
          </Box>
        </Box>
      </Box>
    </>
  );
}
