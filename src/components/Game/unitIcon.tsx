import { Box } from "@chakra-ui/react";

export enum ICON_TYPE {
  WEAPON = 'WEAPON',
  ARMOR = 'ARMOR',
  ACTION = 'ACTION',
}

interface IconProps {
  type: ICON_TYPE
}

const ICON_SIZE = '30%'

const UnitIcon = ({ type }: IconProps) => {

  const top = {
    WEAPON: '25%',
    ARMOR: '20%',
    ACTION: '0%'
  }

  const left = {
    WEAPON: '-10%',
    ARMOR: '12%',
    ACTION: '0%'
  }

  return (
    <Box bg="#DB1DE0" borderRadius="50%" width={ICON_SIZE} height={ICON_SIZE} top={top[type]} left={left[type]} position="relative" />
  )
}

export default UnitIcon;