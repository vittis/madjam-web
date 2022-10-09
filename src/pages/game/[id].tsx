import { Flex, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { gameRoom } from "..";
import Tile from "../../components/Game/tile";

const MAX_COL = 8;
const MAX_ROW = 5;

const Game = () => {
  const router = useRouter();
  const [allHistory, setAllHistory] = useState<{ units: any[] }[]>([]);
  const [previousStep, setPreviousStep] = useState<{ units: any[] }>();
  const [currentStep, setCurrentStep] = useState<{ units: any[] }>();
  const [stepIndex, setStepIndex] = useState(-1);

  const [sliderValue, setSliderValue] = useState(0);

  const [running, setRunning] = useState(false);

  const [winner, setWinner] = useState("");
  console.log({ winner });

  useEffect(() => {
    gameRoom.send("askHistory", {});

    gameRoom.onMessage("sendHistory", (message) => {
      console.log("CHEGOOO");
      console.log(message.history);
      if (!running && message.history) {
        setWinner(message.winner);
        setRunning(true);
        setAllHistory(message.history);
        setStepIndex(0);
        setCurrentStep(message.history[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (!running) {
      return;
    }
    setTimeout(() => {
      if (allHistory.length > 0) {
        if (stepIndex + 1 <= allHistory.length - 1) {
          setPreviousStep(allHistory[stepIndex + 1]);
          setCurrentStep(allHistory[stepIndex + 1]);
          setStepIndex((index) => index + 1);
        } else {
          setRunning(false);
        }
      }
    }, 100);
  }, [currentStep, running]);

  useEffect(() => {
    setPreviousStep(
      allHistory[sliderValue > 0 ? sliderValue - 1 : sliderValue]
    );
    setCurrentStep(allHistory[sliderValue]);
    setStepIndex(sliderValue);
  }, [sliderValue]);

  return (
    <>
      <ReactAudioPlayer src="/audio/game.mp3" autoPlay loop />

      <Flex alignItems="center" justifyContent="center" mt={4}>
        <SimpleGrid
          columns={MAX_COL}
          spacingX="20px"
          spacingY="20px"
          width={MAX_COL * 150}
        >
          {Array.from(Array(MAX_COL * MAX_ROW), (_, i) => {
            const row = Math.floor(i / MAX_COL);
            let col = ((i + 1) % MAX_COL) - 1;
            col = col === -1 ? MAX_COL - 1 : col;

            const unit = currentStep?.units.find(
              (unit) => unit.row === row && unit.col === col
            );

            return <Tile col={col} row={row} unit={unit} running={running} />;
          })}
        </SimpleGrid>
      </Flex>

      {/* hp ❤
        movement 🏃‍♂️
        attack ⚔ */}

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
