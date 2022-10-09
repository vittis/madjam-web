import {
  Box, Button, Heading
} from "@chakra-ui/react";
import Image from "next/image";

const MINITIM_SIZE = "300px"

const options = ["Peida na rola", "Ganhar a jam", "Dormir"]

export default function Final() {
  
  const choosePrize = (option: string) => {
    console.log('prize', option)
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" paddingTop={"20"}>
        <Image src="/assets/other/miniTim.svg" width={MINITIM_SIZE} height={MINITIM_SIZE} />
        <Heading
          maxWidth="600px"
          textShadow="3px 3px 10px #bb0e98df"
          mt={12}
          size="lg"
          marginBottom={10}
        >
          Meua migo... vocÊ é o cara.... o guerreio mais poderoso dessas galáxias.
Você utilizou as melhores possibilidades e fez poesia em meu coração.
Te concedo agora um desejo... escolha sabiamente.
        </Heading>
        {options.map((option) => (
          <Button
          color="black"
          width="300px"
          backgroundColor="pink"
          _hover={{
            backgroundColor: "var(--chakra-colors-pink-800)",
          }}
          onClick={() => choosePrize(option)}
          marginBottom={5}
        >
          {option}
        </Button>
        ))}
    </Box>
  );
}
