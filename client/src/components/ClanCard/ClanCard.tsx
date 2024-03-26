import { FC } from 'react';
import { Clan } from '../../types';
import styles from './ClanCard.module.scss';
import { maxStarsPossible } from '../../constants/gameRelated';
import starIcon from '../../assets/star.svg';
import attackIcon from '../../assets/attack.svg';
import WarMembers from '../WarMembers/WarMembers';

interface ClanCardProps extends Clan {
  totalAttacks: number;
}

const ClanCard: FC<ClanCardProps> = ({ name, tag, attacks, stars, expEarned, members, badgeUrls, totalAttacks }) => {
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
          {stars}/{totalAttacks * maxStarsPossible}
        </span>
      </div>
      <div className={styles.attacks}>
        <img src={attackIcon} className={styles.icon} />
        <span>
          {attacks}/{totalAttacks}
        </span>
      </div>
      {expEarned && <div>Exp earned: {expEarned}</div>}
      {!!members?.length && <WarMembers members={members} />}
    </div>
  );
};

export default ClanCard;
