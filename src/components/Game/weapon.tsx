import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { assetMap } from "../assetMap";

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

const AREA_SIZE = "110%";
const IMG_SIZE = "110%";

interface WeaponProps {
  mainHandWeapon: WeaponData;
}

const Weapon = ({mainHandWeapon}: WeaponProps) => {
  const top = "-15px";
  const left = "70%";

  console.log('mainHandWeapon', mainHandWeapon)

  return (
    <Box
      borderRadius="50%"
      width={AREA_SIZE}
      height={AREA_SIZE}
      top={top}
      left={left}
      position="relative"
      zIndex="-5"
    >
      <Image
      /* @ts-ignore */
        src={assetMap[mainHandWeapon.name]}
        width={IMG_SIZE}
        height={IMG_SIZE}
      />
    </Box>
  );
};

export default Weapon;
