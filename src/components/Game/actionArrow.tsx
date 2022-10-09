import { Box, Image } from "@chakra-ui/react";
import { ACTION_TYPE } from "./unit";

interface ActionArrowProps {
  target?: { col: number, row: number };
  position: { col: number, row: number };
  action: ACTION_TYPE;
}

const ActionArrow = ({target, position, action}:ActionArrowProps) => {
  const findPath = () => {
    if (!target) return ''
    if (position.col === target.col && position.row > target.row) return('top');
    if (position.col === target.col && position.row < target.row) return('bottom');
    if (position.col > target.col && position.row === target.row) return('left');
    if (position.col < target.col && position.row === target.row) return('right');
    if (position.col > target.col && position.row > target.row) return('topLeft');
    if (position.col > target.col && position.row < target.row) return('bottomLeft');
    if (position.col < target.col && position.row > target.row) return('topRight');
    if (position.col < target.col && position.row < target.row) return('bottomRight');
  }

  const arrowLabel = findPath();

  console.log('arrow', arrowLabel);

  if (arrowLabel) {
    return (
      <Box
        position="absolute"
        width="430px"
          height="430px"
          left="calc(-100% - 32.5px)"
          top="calc(-100% - 32.5px)"
      >
        <Image
          src={`/assets/arrow/${action.toLowerCase()}/${arrowLabel}.svg`}
          width="100%"
          height="100%"
          transform="scale(0.7)"
          zIndex="-2"
          opacity="0.73"
        />
      </Box>
    );
  }

  return <></>
};

export default ActionArrow;
