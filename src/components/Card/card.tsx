import { Box, Divider } from "@chakra-ui/react";
import Image from "next/image";

export default function Card() {
  return (
    <Box
      width={220}
      height="100%"
      backgroundColor="#3E3B3B"
      border="solid 3px #3389AD"
      borderRadius={8}
      _hover={{ boxShadow: "outline" }}
      boxShadow="2xl"
    >
      <Box display="flex" justifyContent="flex-end" marginRight={2} gap={1}>
        {/* valor da unidade */}
        <Box>125</Box>
        <Image
          alt="coins"
          src="/assets/other/coins.svg"
          height="25px"
          width="25px"
        ></Image>
      </Box>
      {/* character avatar */}
      <Box
        display="flex"
        justifyContent="center"
        marginTop={2}
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
            src="/assets/character/rat.svg"
            height={100}
            width={100}
          ></Image>
        </Box>
      </Box>
      <Box textAlign="center" marginTop={2}>
        BRABO
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
          Espada Longa
        </Box>
        <Box>
          <Box as="span" fontSize="16px">
            🎓
          </Box>
          {"  "}
          Capacete de Papel
        </Box>
        <Box>
          <Box as="span" fontSize="16px">
            🧥
          </Box>
          {"  "}
          Armadura de Couro
        </Box>
      </Box>
    </Box>
  );
}
