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
import Card from "../../components/Card/card";

export default function Setup() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box
        display="flex"
        justifyContent="center"
        gap={3}
        marginTop={20}
        width="80%"
        height="280px"
      >
        <Card />
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
            <Popover>
              <PopoverTrigger>
                <Box
                  width="60px"
                  height="60px"
                  cursor="pointer"
                  backgroundColor="#AEAEAE"
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
                <PopoverHeader>Short Bow!</PopoverHeader>
                <PopoverBody>
                  <Box> ⚔ Poder: 9 </Box>
                  <Box> 💨 Agilidade: 12</Box>
                  <Box> 🛡 Defesa: 0 </Box>
                  <Box>
                    <Button marginTop={2} backgroundColor="green">
                      Comprar e Equipar!
                    </Button>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Box
                  width="60px"
                  height="60px"
                  cursor="pointer"
                  backgroundColor="#AEAEAE"
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
            <Popover>
              <PopoverTrigger>
                <Box
                  width="60px"
                  height="60px"
                  cursor="pointer"
                  backgroundColor="#AEAEAE"
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
                <PopoverHeader>Short Bow!</PopoverHeader>
                <PopoverBody>
                  <Box> ⚔ Poder: 9 </Box>
                  <Box> 💨 Agilidade: 12</Box>
                  <Box> 🛡 Defesa: 0 </Box>
                  <Box>
                    <Button marginTop={2} backgroundColor="green">
                      Comprar e Equipar!
                    </Button>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Box
                  width="60px"
                  height="60px"
                  cursor="pointer"
                  backgroundColor="#AEAEAE"
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
                <PopoverHeader>Short Bow!</PopoverHeader>
                <PopoverBody>
                  <Box> ⚔ Poder: 9 </Box>
                  <Box> 💨 Agilidade: 12</Box>
                  <Box> 🛡 Defesa: 0 </Box>
                  <Box>
                    <Button marginTop={2} backgroundColor="green">
                      Comprar e Equipar!
                    </Button>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Box
                  width="60px"
                  height="60px"
                  cursor="pointer"
                  backgroundColor="#AEAEAE"
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
                <PopoverHeader>Short Bow!</PopoverHeader>
                <PopoverBody>
                  <Box> ⚔ Poder: 9 </Box>
                  <Box> 💨 Agilidade: 12</Box>
                  <Box> 🛡 Defesa: 0 </Box>
                  <Box>
                    <Button marginTop={2} backgroundColor="green">
                      Comprar e Equipar!
                    </Button>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Box
                  width="60px"
                  height="60px"
                  cursor="pointer"
                  backgroundColor="#AEAEAE"
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
                <PopoverHeader>Short Bow!</PopoverHeader>
                <PopoverBody>
                  <Box> ⚔ Poder: 9 </Box>
                  <Box> 💨 Agilidade: 12</Box>
                  <Box> 🛡 Defesa: 0 </Box>
                  <Box>
                    <Button marginTop={2} backgroundColor="green">
                      Comprar e Equipar!
                    </Button>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Box
                  width="60px"
                  height="60px"
                  cursor="pointer"
                  backgroundColor="#AEAEAE"
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
                <PopoverHeader>Short Bow!</PopoverHeader>
                <PopoverBody>
                  <Box> ⚔ Poder: 9 </Box>
                  <Box> 💨 Agilidade: 12</Box>
                  <Box> 🛡 Defesa: 0 </Box>
                  <Box>
                    <Button marginTop={2} backgroundColor="green">
                      Comprar e Equipar!
                    </Button>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Box
                  width="60px"
                  height="60px"
                  cursor="pointer"
                  backgroundColor="#AEAEAE"
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
                <PopoverHeader>Short Bow!</PopoverHeader>
                <PopoverBody>
                  <Box> ⚔ Poder: 9 </Box>
                  <Box> 💨 Agilidade: 12</Box>
                  <Box> 🛡 Defesa: 0 </Box>
                  <Box>
                    <Button marginTop={2} backgroundColor="green">
                      Comprar e Equipar!
                    </Button>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Box
                  width="60px"
                  height="60px"
                  cursor="pointer"
                  backgroundColor="#AEAEAE"
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
                <PopoverHeader>Short Bow!</PopoverHeader>
                <PopoverBody>
                  <Box> ⚔ Poder: 9 </Box>
                  <Box> 💨 Agilidade: 12</Box>
                  <Box> 🛡 Defesa: 0 </Box>
                  <Box>
                    <Button marginTop={2} backgroundColor="green">
                      Comprar e Equipar!
                    </Button>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger>
                <Box
                  width="60px"
                  height="60px"
                  cursor="pointer"
                  backgroundColor="#AEAEAE"
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
                <PopoverHeader>Short Bow!</PopoverHeader>
                <PopoverBody>
                  <Box> ⚔ Poder: 9 </Box>
                  <Box> 💨 Agilidade: 12</Box>
                  <Box> 🛡 Defesa: 0 </Box>
                  <Box>
                    <Button marginTop={2} backgroundColor="green">
                      Comprar e Equipar!
                    </Button>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </SimpleGrid>
        </Box>
        <Box>
          <Box fontSize={32}>⛑ Capacetes</Box>
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
          <Box fontSize={32}>🧥 Armaduras</Box>
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
