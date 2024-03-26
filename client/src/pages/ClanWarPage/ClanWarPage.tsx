import { FC } from 'react';
import { currentWarUrl } from '../../constants/endpoints';
import useFetchData from '../../hooks/useFetchData';
import { getCurrentWarInfo } from './clanWarPageService';
import styles from './ClanWarPage.module.scss';
import ClanCard from '../../components/ClanCard/ClanCard';

const ClanWarPage: FC = () => {
  const { data } = useFetchData(() => getCurrentWarInfo(currentWarUrl));

  if (!data) {
    return null;
  }

  const { clan, teamSize, attacksPerMember, opponent, startTime, state, endTime, preparationStartTime } = data;
  const totalAttacks = teamSize * attacksPerMember;

  return (
    <div className={styles.container}>
      <div>
        {teamSize} x {teamSize}
      </div>
      <div>War status: {state}</div>
      <div>War started: {startTime}</div>
      <div>War ends: {endTime}</div>
      <div>War starts: {preparationStartTime}</div>
      <div className={styles.clans}>
        <ClanCard {...clan} totalAttacks={totalAttacks} teamSize={teamSize} opponents={opponent.members}/>
        <ClanCard {...opponent} totalAttacks={totalAttacks} teamSize={teamSize} opponents={clan.members}/>
      </div>
    </div>
  );
};

export default ClanWarPage;
