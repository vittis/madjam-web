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

export default function Products() {
  return (
    <Popover>
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
          <Box as="span">Short Bow!</Box>
          <Box paddingRight={6} display="flex" alignItems="center">
            <Box marginRight={2} textColor="#F9E006" fontWeight="bold">
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
          <Box> ⚔ Poder: 9 </Box>
          <Box> 💨 Agilidade: 12</Box>
          <Box>
            <Button marginTop={2} backgroundColor="green">
              Comprar e Equipar!
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
