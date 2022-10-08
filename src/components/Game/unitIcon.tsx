import { Box } from "@chakra-ui/react";
import Image from "next/image";


export enum ICON_TYPE {
  WEAPON = 'WEAPON',
  CHEST = 'CHEST',
  HEAD = 'HEAD',
  ACTION = 'ACTION',
}

interface IconProps {
  type: ICON_TYPE
}

const AREA_SIZE = '30%'
const ICON_SIZE = '80%'

const UnitIcon = ({ type }: IconProps) => {

  const top = {
    WEAPON: '25%',
    CHEST: '20%',
    HEAD: '20%',
    ACTION: '0%'
  }

  const left = {
    WEAPON: '-10%',
    CHEST: '12%',
    HEAD: '12%',
    ACTION: '0%'
  }

  const itemName = type === ICON_TYPE.WEAPON ? 'sword' : 'basicArmor'

  return (
    <Box //bg="#DB1DE0"
      borderRadius="50%" width={AREA_SIZE} height={AREA_SIZE} top={top[type]} left={left[type]} position="relative">
      <Image src={`/assets/${type.toLowerCase()}/${itemName}.svg`} width={ICON_SIZE} height={ICON_SIZE} />
    </Box>
  )
}

export default UnitIcon;