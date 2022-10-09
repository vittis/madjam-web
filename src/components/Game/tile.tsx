import { Box } from "@chakra-ui/react";
import Unit, { UnitData } from "./unit";

interface TileProps {
  col: number;
  row: number;
  unit?: UnitData;
  running: boolean;
}

const TILE_SIZE = "130px";

const Tile = ({ col, row, unit, running }: TileProps) => {
    const position = {
        col: col,
        row: row
    }

  return (
    <Box
      //bg="#e84b2f1d"
      height={TILE_SIZE}
      width={TILE_SIZE}
      position="relative"
      //border="1px rgba(183, 183, 183, 0.1) solid"
      borderRadius={4}
      borderStyle="dashed"
    >
      {/* <Box position="absolute" right="0" top="0">
                {col}, {row}{" "}
            </Box> */}
      {unit && <Unit unit={unit} running={running} position={position} />}
    </Box>
  );
};

export default Tile;
