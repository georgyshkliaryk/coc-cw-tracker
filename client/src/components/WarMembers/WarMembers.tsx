import { FC, useMemo } from 'react';
import key from 'weak-key';
import { ClanMember, MemberGeneralData } from '@/types';
import Member from '@/components/WarMembers/Member/Member';
import styles from './WarMembers.module.scss';

const getOpponentsGeneralData = (members: ClanMember[]): MemberGeneralData[] => {
  const membersData: MemberGeneralData[] = [];
  members.forEach((member) => {
    membersData.push({
      name: member.name,
      tag: member.tag,
      mapPosition: member.mapPosition,
    });
  });

  return membersData;
};

interface WarMembersProps {
  members: ClanMember[];
  opponents: ClanMember[];
  isPreparation: boolean;
}

const WarMembers: FC<WarMembersProps> = ({ members, opponents, isPreparation }) => {
  const opponentsGeneralData = getOpponentsGeneralData(opponents);
  const sortedMembers = useMemo(
    () =>
      members.sort((a, b) => {
        return a.mapPosition - b.mapPosition;
      }),
    [members]
  );

  return (
    <div className={styles.container}>
      {sortedMembers.map((member) => (
        <Member
          {...member}
          key={key(member)}
          opponentsGeneralData={opponentsGeneralData}
          isPreparation={isPreparation}
        />
      ))}
    </div>
  );
};

export default WarMembers;
