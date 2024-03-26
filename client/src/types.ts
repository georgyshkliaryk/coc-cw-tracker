interface Badge {
  small: string;
  medium: string;
  large: string;
}

enum ClanWarStateTypes {
  notInWar = 'notInWar',
  preparation = 'preparation',
  inWar = 'inWar',
  warEnded = 'warEnded',
}

export interface MemberAttack {
  order: number;
  attackerTag: string;
  defenderTag: string;
  stars: number;
  destructionPercentage: number;
  duration: number;
}

export interface ClanMember {
  tag: string;
  name: string;
  mapPosition: number;
  townhallLevel: number;
  opponentAttacks: number;
  bestOpponentAttack?: MemberAttack;
  attacks?: MemberAttack[];
}

export interface Clan {
  destructionPercentage: number;
  tag: string;
  name: string;
  badgeUrls: Badge;
  clanLevel: number;
  attacks: number;
  stars: number;
  expEarned: number;
  members?: ClanMember[];
}

export interface ClanWarProps {
  state: ClanWarStateTypes;
  startTime: string;
  endTime: string;
  preparationStartTime: string;
  teamSize: number;
  attacksPerMember: number;
  clan: Clan;
  opponent: Clan;
}
