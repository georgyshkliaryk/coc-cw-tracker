import { FC } from 'react';
import { Clan, ClanMember } from '../../types';
import { maxStarsPossible } from '../../constants/gameRelated';
import WarMembers from '../WarMembers/WarMembers';
import starIcon from '../../assets/star.svg';
import attackIcon from '../../assets/attack.svg';
import desctructionIcon from '../../assets/desctruction.svg';
import styles from './ClanCard.module.scss';

interface ClanCardProps extends Clan {
  totalAttacks: number;
  teamSize: number;
  opponents?: ClanMember[];
}

const ClanCard: FC<ClanCardProps> = ({
  name,
  tag,
  attacks,
  stars,
  members,
  badgeUrls,
  totalAttacks,
  destructionPercentage,
  teamSize,
  opponents,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {!!badgeUrls && <img src={badgeUrls.small} alt={name} className={styles.badge} />}
        <div>
          {name}
          <div className={styles.tag}>{tag}</div>
        </div>
      </div>
      <div className={styles.stars}>
        <img src={starIcon} className={styles.icon} />
        <span>
          {stars}/{teamSize * maxStarsPossible}
        </span>
      </div>
      <div className={styles.attacks}>
        <img src={attackIcon} className={styles.icon} />
        <span>
          {attacks}/{totalAttacks}
        </span>
      </div>
      <div className={styles.percentage}>
        <img src={desctructionIcon} className={styles.icon} />
        {destructionPercentage}%
      </div>
      {!!(members?.length && opponents?.length) && <WarMembers members={members} opponents={opponents} />}
    </div>
  );
};

export default ClanCard;
