import { MemberAttack, MemberGeneralData } from '@/types';

export const totalAttacks = 2;

export const getMinutesAndSecondsFromSeconds = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return `${minutes}m ${seconds}s`;
};

export const getStarsContributed = (attacks?: MemberAttack[]): number => {
  if (!attacks?.length) {
    return 0;
  }
  return attacks.reduce((acc, curr) => {
    acc += curr.stars;
    return acc;
  }, 0);
};

export const findMemberByTag = (tag: string, membersData: MemberGeneralData[]) => {
  return membersData.find((member) => tag === member.tag);
};
