import { ChevronLeftIcon, Icon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Progress,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useWsClient } from "../../context/socketContext";
import useSubscribe from "../../context/useSubscribe";

const Game = () => {
  const router = useRouter();
  const gameId = router.query.id;
  const { client, clientState } = useWsClient();

  const [allHistory, setAllHistory] = useState<{ units: any[] }[]>([]);
  const [currentStep, setCurrentStep] = useState<{ units: any[] }>();
  const [stepIndex, setStepIndex] = useState(-1);

  const [sliderValue, setSliderValue] = useState(0);

  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (clientState !== "connected") {
      return;
    }
    client?.action("startGame", { id: gameId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientState]);

  useSubscribe(`game:${gameId}`, ({ message }: any) => {
    console.log("game recebe message", { message });
    if (!running && message.history) {
      setRunning(true);
      setAllHistory(message.history);
      setStepIndex(0);
      setCurrentStep(message.history[0]);
    }
  });

  useEffect(() => {
    if (!running) {
      return;
    }
    setTimeout(() => {
      if (allHistory.length > 0) {
        if (stepIndex + 1 <= allHistory.length - 1) {
          setCurrentStep(allHistory[stepIndex + 1]);
          setStepIndex((index) => index + 1);
        } else {
          setRunning(false);
        }
      }
    }, 100);
  }, [currentStep, running]);

  useEffect(() => {
    setCurrentStep(allHistory[sliderValue]);
    setStepIndex(sliderValue);
  }, [sliderValue]);

  return (
    <>
      <Flex alignItems="center" gap={4}>
        <IconButton
          onClick={router.back}
          rounded="full"
          icon={<ChevronLeftIcon />}
          aria-label="Open Chat"
          size="sm"
        />

        <Text as="h3">Game Time</Text>

        {allHistory && (
          <>
            <Slider
              onChange={(value) => {
                setSliderValue(value);
                setRunning(false);
              }}
              value={stepIndex}
              defaultValue={0}
              width="400px"
              aria-label="slider-ex-1 min={0} max={300} step={30}"
              min={0}
              max={allHistory.length - 1}
              step={1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>

            <IconButton
              onClick={() => {
                setRunning(!running);
              }}
              icon={
                !running ? (
                  <Icon as={BsFillPlayFill} />
                ) : (
                  <Icon as={BsFillPauseFill} />
                )
              }
              aria-label="Open Chat"
              size="sm"
            />
          </>
        )}
      </Flex>

      <SimpleGrid columns={7} spacing={1}>
        {Array.from(Array(35), (_, i) => {
          const row = Math.floor(i / 7);
          let col = ((i + 1) % 7) - 1;
          col = col === -1 ? 6 : col;

          const unit = currentStep?.units.find(
            (unit) => unit.row === row && unit.col === col
          );

          if (!unit) {
            return (
              <Box
                bg="#e84b2f1d"
                height="110px"
                width="110px"
                position="relative"
              >
                <Box position="absolute" right="0" top="0">
                  {col}, {row}{" "}
                </Box>
              </Box>
            );
          }

          const hpPercentage = (unit.stats.hp / unit.stats.maxHp) * 100;

          const armorPercentage =
            (unit.stats.armorHp / unit.stats.maxArmorHp) * 100;

          const progressAP = (unit.stats.ap * 100) / 1000;

          const apTransitionThreshold = unit.stats.quickness >= 15 ? 15 : 6;
          return (
            <Popover placement="top-start">
              {/* @ts-ignore */}
              <PopoverTrigger>
                <Box
                  //bg={`linear-gradient(to top, #e84b2f2a ${hpPercentage}%, transparent ${hpPercentage}%)`}
                  bg={unit?.owner === "P1" ? "#e84b2fb0" : "#714edaae"}
                  height="110px"
                  width="110px"
                  position="relative"
                  fontSize="sm"
                >
                  <Box position="absolute" right="0" top="0">
                    {col}, {row}{" "}
                  </Box>
                  {unit?.backgrounds?.[0].name.substring(0, 2)}{" "}
                  {unit?.backgrounds?.[1].name.substring(0, 2)}{" "}
                  {unit.currentAction}
                  <Progress
                    value={progressAP}
                    colorScheme={
                      unit.currentAction === "move" ? "twitter" : "red"
                    }
                    transform="translate(55%, 208%) rotate(-90deg)"
                    sx={
                      progressAP > apTransitionThreshold && running
                        ? {
                            "div[role='progressbar']": {
                              transition: "width 0.2s",
                            },
                          }
                        : undefined
                    }
                  />
                  <Box>{unit.equipment.mainHandWeapon.name}</Box>
                  HP: {unit.stats.hp} / {unit.stats.maxHp}
                  <Progress
                    size="sm"
                    value={hpPercentage < 0 ? 0 : hpPercentage}
                    colorScheme="green"
                    sx={{
                      "div[role='progressbar']": {
                        transition: "width 0.2s",
                      },
                    }}
                  />
                  Armor: {unit.stats.armorHp} / {unit.stats.maxArmorHp}
                  <Progress
                    size="sm"
                    value={armorPercentage}
                    colorScheme="gray"
                    sx={{
                      "div[role='progressbar']": {
                        transition: "width 0.2s",
                      },
                    }}
                  />
                </Box>
              </PopoverTrigger>
              <PopoverContent _focus={{ border: "#8b0000 solid 2px" }}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Box>
                    Str: <b>{unit.stats.str}</b>
                  </Box>
                  <Box>
                    Dex: <b>{unit.stats.dex}</b>
                  </Box>
                  <Box>
                    Quickness: <b>{unit.stats.quickness}</b>
                  </Box>
                  <Box>
                    Weapon: <b>{unit.equipment.mainHandWeapon.name}</b> (dmg:{" "}
                    <b>{unit.equipment.mainHandWeapon.damage.min}</b>){" "}
                    (effective: <b>{unit.stats.mainHandDamage.min}</b>)
                  </Box>
                  <Box></Box>
                  <Box>
                    Head: <b>{unit.equipment.head.name}</b>
                  </Box>
                  <Box>
                    Body: <b>{unit.equipment.chest.name}</b>
                  </Box>
                  <Box>
                    Armor type: <b>{unit.stats.armorType}</b>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          );
        })}
      </SimpleGrid>

      {/* history && history.units.map() */}

      {/* <Button
        onClick={() => {
          client?.action("startGame", { id: gameId }, (response) => {});
        }}
      >
        READY
      </Button> */}
    </>
  );
};

export default Game;
