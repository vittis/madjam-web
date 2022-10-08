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