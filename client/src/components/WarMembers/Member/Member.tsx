import { FC, useState } from 'react';
import key from 'weak-key';
import classNames from 'classnames';
import { ClanMember, MemberGeneralData } from '@/types';
import { TownHallsToIconsMap, maxStarsPossible } from '@/constants/gameRelated';
import starIcon from '@/assets/star.svg';
import attackIcon from '@/assets/attack.svg';
import downArrowIcon from '@/assets/down-arrow.svg';
import desctructionIcon from '@/assets/desctruction.svg';
import timerIcon from '@/assets/timer.svg';
import { findMemberByTag, getMinutesAndSecondsFromSeconds, getStarsContributed, totalAttacks } from './helpers';
import styles from './Member.module.scss';

interface MemberProps extends ClanMember {
  opponentsGeneralData: MemberGeneralData[];
  isPreparation: boolean;
}

const Member: FC<MemberProps> = ({
  name,
  mapPosition,
  attacks,
  townhallLevel,
  opponentsGeneralData,
  isPreparation,
}) => {
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
        {!isPreparation && (
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
        )}
      </div>

      {!!attacks?.length && isExpanded && (
        <>
          <div className={styles.attacksTitle}>Attacks</div>
          {attacks.map((attack) => {
            const defender = findMemberByTag(attack.defenderTag, opponentsGeneralData);

            return (
              <div key={key(attack)} className={styles.attack}>
                {defender?.mapPosition}. {defender?.name}
                <div className={styles.attackInfo}>
                  <div className={styles.infoItem}>
                    {attack.stars}
                    <img src={starIcon} className={styles.attackIcon} />
                  </div>
                  <div className={styles.infoItem}>
                    {attack.destructionPercentage}%
                    <img src={desctructionIcon} className={styles.attackIcon} />
                  </div>
                  <div className={styles.infoItem}>
                    {getMinutesAndSecondsFromSeconds(attack.duration)}
                    <img src={timerIcon} className={styles.attackIcon} />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
      {hasAttacked && (
        <img src={downArrowIcon} className={classNames(styles.expandIcon, isExpanded && styles.isExpanded)} />
      )}
    </button>
  );
};

export default Member;
