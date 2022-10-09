import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { assetMap } from "../assetMap";

interface IconProps {
  background: string;
  owner: "P1" | "P2";
}

const AREA_SIZE = "27px";
const ICON_SIZE = "80%";

const UnitIcon = ({ background, owner }: IconProps) => {
  const left = owner === "P1" ? "90px" : "0px";

  return (
    <Box //bg="#DB1DE0"
      borderRadius="50%"
      width={AREA_SIZE}
      height={AREA_SIZE}
      top="-27px"
      left={left}
      position="absolute"
      zIndex={1000}
    >
      <Image
        /* @ts-ignore */
        src={assetMap[background]}
        width={ICON_SIZE}
        height={ICON_SIZE}
      />
    </Box>
  );
};

export default UnitIcon;
