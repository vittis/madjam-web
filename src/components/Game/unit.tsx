import { Box, Flex, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Progress } from "@chakra-ui/react";
import Weapon from "./weapon";

enum ARMOR_TYPE {
    LIGHT = "light",
    MEDIUM = "medium",
    HEAVY = "heavy",
}

interface UnitStats {
    str: number;
    dex: number;
    hp: number;
    maxHp: number;
    armorHp: number;
    maxArmorHp: number;
    quickness: number;
    ap: number;
    mainHandDamage: {
        min: number;
        max: number;
    };
    weight: number;
    armorType: ARMOR_TYPE;
    atkRange: number;
}

interface BackgroundData {
    name: string;
    str: number;
    dex: number;
    hp: number;
    quickness: number;
}

interface Equipment {
    mainHandWeapon: WeaponData;
    chest: ArmorData;
    head: ArmorData;
}

interface WeaponData {
    name: string;
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

enum ARMOR_SLOT_TYPE {
    CHEST = "CHEST",
    HEAD = "HEAD",
}

interface ArmorData {
    name: string;
    armorHp: number;
    weight: number;
    quickness: number;
    slot: ARMOR_SLOT_TYPE;
}

export interface UnitData {
    stats: UnitStats;
    backgrounds: BackgroundData[];
    equipment: Equipment;
    currentAction: ACTION_TYPE;
    // Temporary implementation of owner
    owner: "P1" | "P2";
}

enum ACTION_TYPE {
    MOVE = "move",
    ATTACK = "attack",
}

interface UnitProps {
    unit: UnitData;
    running: boolean;
}

const UNIT_SIZE = "60%";

const PROGRESS_COLOR = {
    HP: "#BD0215",
    ARMOR: "#024ABD",
    ACTION: "#12bd02",
    BORDER: "#000000"
}

const Unit = ({ unit, running }: UnitProps) => {

    const hpPercentage = (unit.stats.hp / unit.stats.maxHp) * 100;

    const armorPercentage =
        (unit.stats.armorHp / unit.stats.maxArmorHp) * 100;

    const progressAP = (unit.stats.ap * 100) / 1000;

    const apTransitionThreshold = unit.stats.quickness >= 15 ? 15 : 6;

    const character = unit.owner === "P1" ? 'rat' : 'frog'

    return (
        <Popover placement="top-start">
            {/* @ts-ignore */}
            <PopoverTrigger>
                <Flex alignItems="center" justifyContent="start" width="100%" height="100%">
                    <Box
                        bgImage={`/assets/character/${character}.svg`}
                        bgSize="contain"
                        bgPos="center"
                        bgRepeat="no-repeat"
                        height={UNIT_SIZE}
                        width={UNIT_SIZE}
                        position="relative"
                        fontSize="sm"
                    >

                        <Progress
                            width="100px"
                            top="-17px"
                            left="15px"
                            size="sm"
                            value={hpPercentage < 0 ? 0 : hpPercentage}
                            //colorScheme="green"
                            bgColor="transparent"
                            border={`1px solid ${PROGRESS_COLOR.BORDER}`}
                            borderRadius="4px"
                            sx={{
                                "div[role='progressbar']": {
                                    transition: "width 0.2s",
                                    bgColor: PROGRESS_COLOR.HP
                                },
                            }}
                        />
                        <Progress
                            width="100px"
                            top="-25px"
                            left="15px"
                            size="sm"
                            value={armorPercentage < 0 ? 0 : armorPercentage}
                            //colorScheme="gray"
                            bgColor="transparent"
                            border={`1px solid ${PROGRESS_COLOR.BORDER}`}
                            borderRadius="4px"
                            sx={{
                                "div[role='progressbar']": {
                                    transition: "width 0.2s",
                                    bgColor: PROGRESS_COLOR.ARMOR
                                },
                            }}
                        />
                        <Progress
                            width="100px"
                            top="18px"
                            left="-61px"
                            size="sm"
                            value={progressAP}
                            /* colorScheme={
                                unit.currentAction === "move" ? "twitter" : "red"
                            } */
                            colorScheme="karpov"
                            bgColor="transparent"
                            transform="rotate(-90deg)"
                            border={`1px solid ${PROGRESS_COLOR.BORDER}`}
                            borderRadius="4px"
                            sx={
                                progressAP > apTransitionThreshold && running
                                    ? {
                                        "div[role='progressbar']": {
                                            transition: "width 0.2s",
                                            //bgColor: PROGRESS_COLOR.ACTION
                                        },
                                    }
                                    : undefined
                            }
                        />

                        <Box position="absolute" top="-27px" left="-5px" fontSize="1.2rem" textAlign="left">❤</Box>
                        <Box position="absolute" top="77px" left="-22px" fontSize="1.2rem" textAlign="left">🏃‍♂️</Box>

                        <Weapon />

                        {/* <UnitIcon type={ICON_TYPE.WEAPON} /> */}
                        {/* <UnitIcon type={ICON_TYPE.CHEST} /> */}
                        {/* <UnitIcon type={ICON_TYPE.ACTION} /> */}
                    </Box>
                </Flex>

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
    )

}

export default Unit;