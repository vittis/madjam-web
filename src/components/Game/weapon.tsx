import { Box, Image } from "@chakra-ui/react";


export interface WeaponStats {
  damage: {
    min: number;
    max: number;
  };
  atkRange: number;
  weight: number;
  quickness: number;
  penetration: number;
  armorShred: number;
  strScale: number;
  dexScale: number;
}

export interface WeaponData extends WeaponStats {
  name: string;
}

const AREA_SIZE = '90%'
const IMG_SIZE = '90%'

const Weapon = () => {

  const top = "0px";
  const left = "90%";

  return (
    <Box //bg="#DB1DE0"
      borderRadius="50%" width={AREA_SIZE} height={AREA_SIZE} top={top} left={left} position="relative" >
      <Image src="/assets/weapon/sword.svg" width={IMG_SIZE} height={IMG_SIZE} />
    </Box >
  )

}

export default Weapon;