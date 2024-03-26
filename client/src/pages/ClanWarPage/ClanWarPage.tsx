import { FC } from 'react';
import { currentWarUrl } from '../../constants/endpoints';
import useFetchData from '../../hooks/useFetchData';
import { getCurrentWarInfo } from './clanWarPageService';
import { ClanWarStateTypes } from '../../types';
import ClanCard from '../../components/ClanCard/ClanCard';
import ClanWarHeading from '../../components/ClanWarHeading/ClanWarHeading';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import styles from './ClanWarPage.module.scss';

const ClanWarPage: FC = () => {
  const { data, isLoading } = useFetchData(() => getCurrentWarInfo(currentWarUrl));

  if (!data) {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    return <div className={styles.error}>An error ocurred. Try again later.</div>;
  }

  const { clan, teamSize, attacksPerMember, opponent, state, startTime, endTime } = data;
  const totalAttacks = teamSize * attacksPerMember;

  const isPreparation = state === ClanWarStateTypes.preparation;
  const isInWar = state === ClanWarStateTypes.inWar;
  const isNotInWar = state === ClanWarStateTypes.notInWar;

  const getTimeLeft = () => {
    if (isPreparation) {
      return startTime;
    }
    if (isInWar) {
      return endTime;
    }

    return '';
  };

  if (isNotInWar) {
    return <div className={styles.error}>The clan is not participating in war right now.</div>;
  }

  return (
    <>
      <ClanWarHeading
        state={state}
        clanScore={clan.stars}
        opponentScore={opponent.stars}
        teamSize={teamSize}
        timeLeft={getTimeLeft()}
      />
      <div className={styles.clans}>
        <ClanCard
          {...clan}
          totalAttacks={totalAttacks}
          teamSize={teamSize}
          opponents={opponent.members}
          isPreparation={isPreparation}
        />
        <ClanCard
          {...opponent}
          totalAttacks={totalAttacks}
          teamSize={teamSize}
          opponents={clan.members}
          isPreparation={isPreparation}
        />
      </div>
    </>
  );
};

export default ClanWarPage;
