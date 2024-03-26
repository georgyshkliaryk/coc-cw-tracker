import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ClanWarStateTypes, WarStateToTitleMap } from '../../types';
import { getTimeTillEnd } from '../../helpers/dates';
import { clanResultsToStylesMap, getClanResults } from './helpers';
import styles from './ClanWarHeading.module.scss';

interface ClanWarHeadingProps {
  teamSize: number;
  state: ClanWarStateTypes;
  startTime: string;
  endTime: string;
  preparationStartTime: string;
  clanScore: number;
  opponentScore: number;
}

const ClanWarHeading: FC<ClanWarHeadingProps> = ({ teamSize, state, endTime, clanScore, opponentScore }) => {
  const [time, setTime] = useState(getTimeTillEnd(endTime));

  useEffect(() => {
    const offset = 1000;
    const interval = setInterval(() => {
      setTime(getTimeTillEnd(endTime));
    }, offset);

    return () => clearInterval(interval);
  }, [endTime]);

  const clanResults = getClanResults(clanScore, opponentScore);

  return (
    <div className={styles.container}>
      <div className={styles.warState}>{WarStateToTitleMap[state]}</div>
      {state !== ClanWarStateTypes.warEnded && <div className={styles.endTime}>War ends in {time}</div>}
      <div className={styles.score}>
        <span className={classNames(styles.clanScore, clanResultsToStylesMap[clanResults])}>{clanScore}</span> :{' '}
        <span className={classNames(styles.opponentScore, clanResultsToStylesMap[clanResults])}>{opponentScore}</span>
      </div>
      <div className={styles.teamSize}>
        {teamSize} vs {teamSize}
      </div>
    </div>
  );
};

export default ClanWarHeading;
