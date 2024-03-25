import { FC } from 'react';
import key from 'weak-key';
import { currentWarUrl } from '../../constants/endpoints';
import { maxStarsPossible } from '../../constants/gameRelated';
import useFetchData from '../../hooks/useFetchData';
import { getCurrentWarInfo } from './currentWarPageService';
import styles from './CurrentWarPage.module.scss';

const CurrentWarPage: FC = () => {
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
        <div className={styles.leftClan}>
          <h3>{clan.name}</h3>
          <div>{clan.tag}</div>
          <div>Level: {clan.clanLevel}</div>
          <div>
            Attacks: {clan.attacks} / {totalAttacks}
          </div>
          <div>
            Stars: {clan.stars} / {totalAttacks * maxStarsPossible}
          </div>
          {clan.expEarned && <div>Exp earned: {clan.expEarned}</div>}
          <div>
            {clan.members?.map((member) => (
              <div key={member.tag}>
                <div>
                  {member.mapPosition}. {member.name}
                </div>
                <div>
                  {member.attacks?.map((attack) => (
                    <div key={key(attack)}>
                      {attack.order}. {attack.defenderTag} {attack.stars}/{maxStarsPossible}
                      <div>
                        {attack.destructionPercentage} {attack.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div></div>
        </div>
        <div className={styles.rightClan}>
          <h3>{opponent.name}</h3>
          <div>{opponent.tag}</div>
          <div>Level: {opponent.clanLevel}</div>
          <div>
            Attacks: {opponent.attacks} / {totalAttacks}
          </div>
          <div>
            Stars: {opponent.stars} / {totalAttacks * maxStarsPossible}
          </div>
          {clan.expEarned && <div>Exp earned: {clan.expEarned}</div>}
          <div>
            {opponent.members?.map((member) => (
              <div key={member.tag}>
                <div>
                  {member.mapPosition}. {member.name}
                </div>
                <div>
                  {member.attacks?.map((attack) => (
                    <div key={key(attack)}>
                      {attack.order}. {attack.defenderTag} {attack.stars}/{maxStarsPossible}
                      <div>
                        {attack.destructionPercentage} {attack.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWarPage;
