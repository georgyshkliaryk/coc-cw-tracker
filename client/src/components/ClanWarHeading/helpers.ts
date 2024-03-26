import { ClanResultsTypes } from '../../types';
import styles from './ClanWarHeading.module.scss';

export const getClanResults = (clanStars: number, opponentStars: number): ClanResultsTypes => {
  if (clanStars > opponentStars) {
    return ClanResultsTypes.isWinning;
  }

  if (clanStars < opponentStars) {
    return ClanResultsTypes.isLosing;
  }

  return ClanResultsTypes.isDraw;
};

export const clanResultsToStylesMap = {
  [ClanResultsTypes.isWinning]: styles.isWinning,
  [ClanResultsTypes.isLosing]: styles.isLosing,
  [ClanResultsTypes.isDraw]: styles.isDraw,
};
