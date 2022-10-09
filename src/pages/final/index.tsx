import {
  Box,
  Button,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";

const MINITIM_SIZE = "300px";

const options = ["Ganhar a jam", "Dormir"];

export default function Final() {
  const choosePrize = (option: string) => {
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal
        onClose={() => {}}
        closeOnOverlayClick={false}
        isOpen={showModal}
        isCentered
        size="md"
      >
        <ModalOverlay />
        <ModalContent p={20} fontSize="2xl">
          Obrigado por jogar! 🙏
        </ModalContent>
      </Modal>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop={"20"}
      >
        <Image
          src="/assets/other/miniTim.svg"
          width={MINITIM_SIZE}
          height={MINITIM_SIZE}
        />
        <Heading
          maxWidth="600px"
          textShadow="3px 3px 10px #bb0e98df"
          mt={12}
          size="lg"
          marginBottom={10}
        >
          Meua migo... vocÊ é o cara.... o guerreio mais poderoso dessas
          galáxias. Você utilizou as melhores possibilidades e fez poesia em meu
          coração. Te concedo agora um desejo... Escolha sabiamente.
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
    </>
  );
}
