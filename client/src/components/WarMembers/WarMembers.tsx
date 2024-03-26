import { FC, useMemo } from 'react';
import key from 'weak-key';
import { ClanMember } from '../../types';
import Member from './Member/Member';
import styles from './WarMembers.module.scss';

interface WarMembersProps {
  members: ClanMember[];
}

const WarMembers: FC<WarMembersProps> = ({ members }) => {
  const sortedMembers = useMemo(
    () =>
      members.sort((a, b) => {
        return a.mapPosition - b.mapPosition;
      }),
    [members]
  );

  return (
    <div className={styles.container}>
      {sortedMembers?.map((member) => (
        <Member {...member} key={key(member)} />
      ))}
    </div>
  );
};

export default WarMembers;
