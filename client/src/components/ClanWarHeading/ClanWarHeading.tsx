import { FC, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { ClanWarStateTypes, WarStateToTitleMap } from '../../types';
import { getTimeTillEnd } from '../../helpers/dates';
import { clanResultsToStylesMap, getClanResults } from './helpers';
import styles from './ClanWarHeading.module.scss';

interface ClanWarHeadingProps {
  teamSize: number;
  state: ClanWarStateTypes;
  timeLeft: string;
  clanScore: number;
  opponentScore: number;
}

const ClanWarHeading: FC<ClanWarHeadingProps> = ({ teamSize, state, timeLeft, clanScore, opponentScore }) => {
  const [time, setTime] = useState(getTimeTillEnd(timeLeft));

  useEffect(() => {
    const offset = 1000;
    const interval = setInterval(() => {
      setTime(getTimeTillEnd(timeLeft));
    }, offset);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const clanResults = getClanResults(clanScore, opponentScore);
  const isPreparation = state === ClanWarStateTypes.preparation;
  const isInWar = state === ClanWarStateTypes.inWar;

  const warTimeInfo = useMemo(() => {
    if (isPreparation) {
      return `War starts in ${time}`;
    }
    if (isInWar) {
      return `War ends in ${time}`;
    }

    return null;
  }, [isInWar, isPreparation, time]);

  return (
    <div className={styles.container}>
      <div className={styles.warState}>{WarStateToTitleMap[state]}</div>
      <div className={styles.timeInfo}>{warTimeInfo}</div>
      {!isPreparation && (
        <div className={styles.score}>
          <span className={classNames(styles.clanScore, clanResultsToStylesMap[clanResults])}>{clanScore}</span> :{' '}
          <span className={classNames(styles.opponentScore, clanResultsToStylesMap[clanResults])}>{opponentScore}</span>
        </div>
      )}
      <div className={styles.teamSize}>
        {teamSize} vs {teamSize}
      </div>
    </div>
  );
};

export default ClanWarHeading;
