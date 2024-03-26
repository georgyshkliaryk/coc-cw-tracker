import { FC, useState } from 'react';
import key from 'weak-key';
import classNames from 'classnames';
import { ClanMember, MemberAttack } from '../../../types';
import { TownHallsToIconsMap, maxStarsPossible } from '../../../constants/gameRelated';
import starIcon from '../../../assets/star.svg';
import attackIcon from '../../../assets/attack.svg';
import downArrowIcon from '../../../assets/down-arrow.svg';
import styles from './Member.module.scss';

const totalAttacks = 2;

const getMinutesAndSecondsFromSeconds = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return `${minutes} min ${seconds} s`;
};

const getStarsContributed = (attacks?: MemberAttack[]): number => {
  if (!attacks?.length) {
    return 0;
  }
  return attacks.reduce((acc, curr) => {
    acc += curr.stars;
    return acc;
  }, 0);
};

const Member: FC<ClanMember> = ({ name, mapPosition, attacks, townhallLevel }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const attacksDone = attacks?.length || 0;
  const starsContributed = getStarsContributed(attacks);
  const hasAttacked = attacksDone > 0;
  const canAttack = attacksDone < totalAttacks;
  const thIcon = TownHallsToIconsMap[townhallLevel];

  const toggleIsExpanded = () => {
    setIsExpanded((wasExpanded) => !wasExpanded);
  };

  return (
    <button
      className={classNames(styles.card, !canAttack && styles.cantAttack, hasAttacked && styles.hasAttacked)}
      onClick={toggleIsExpanded}
      tabIndex={hasAttacked ? 0 : -1}
    >
      <div className={styles.cardHeader}>
        <div className={styles.title}>
          {mapPosition}. {name}
          {!!thIcon && <img className={styles.thIcon} src={thIcon} alt={`townhall ${townhallLevel}`} />}
        </div>
        <div>
          <div className={styles.logItem}>
            <img src={attackIcon} className={styles.icon} />
            {attacksDone}/{totalAttacks}
          </div>
          <div className={styles.logItem}>
            <img src={starIcon} className={styles.icon} />
            {starsContributed}/{maxStarsPossible * totalAttacks}
          </div>
        </div>
      </div>

      {!!attacks?.length &&
        isExpanded &&
        attacks.map((attack) => (
          <div key={key(attack)} className={styles.attack}>
            {attack.defenderTag}
            <div className={styles.attackInfo}>
              <div>
                {attack.stars}
                <img src={starIcon} className={styles.attackIcon} />
              </div>
              <div>{attack.destructionPercentage}%</div>
              <div>{getMinutesAndSecondsFromSeconds(attack.duration)}</div>
            </div>
          </div>
        ))}
      {hasAttacked && (
        <img src={downArrowIcon} className={classNames(styles.expandIcon, isExpanded && styles.isExpanded)} />
      )}
    </button>
  );
};

export default Member;
