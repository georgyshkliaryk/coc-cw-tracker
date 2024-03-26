import { FC } from 'react';
import { currentWarUrl } from '../../constants/endpoints';
import useFetchData from '../../hooks/useFetchData';
import { getCurrentWarInfo } from './clanWarPageService';
import ClanCard from '../../components/ClanCard/ClanCard';
import ClanWarHeading from '../../components/ClanWarHeading/ClanWarHeading';
import styles from './ClanWarPage.module.scss';

const ClanWarPage: FC = () => {
  const { data } = useFetchData(() => getCurrentWarInfo(currentWarUrl));

  if (!data) {
    return null;
  }

  const { clan, teamSize, attacksPerMember, opponent, ...restData } = data;
  const totalAttacks = teamSize * attacksPerMember;
  const headingProps = { ...restData, teamSize };

  return (
    <div className={styles.container}>
      <ClanWarHeading {...headingProps} clanScore={clan.stars} opponentScore={opponent.stars} />
      <div className={styles.clans}>
        <ClanCard {...clan} totalAttacks={totalAttacks} teamSize={teamSize} opponents={opponent.members} />
        <ClanCard {...opponent} totalAttacks={totalAttacks} teamSize={teamSize} opponents={clan.members} />
      </div>
    </div>
  );
};

export default ClanWarPage;
