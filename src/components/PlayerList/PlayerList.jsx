import { Crown, Person } from '../../lib/icons';
import styles from './playerList.module.scss'

export default function PlayerList({ playerList, playerInfo }) {

    if (!playerList) return
    return (
        <div className={styles.playerList}>
            <div className={styles.playersWrapper}>
                {playerList.map((player, index) => {
                    return (
                        <Player key={index} playerInfo={playerInfo} player={player}/>
                    );
                })}

            </div>
        </div>
    )
}

function Player({ key, playerInfo, player}) {
    return (
        <div key={key} className={styles.player}>
            <span>{player.name}</span>
            <div className={styles.iconsWrapper}>
                {player.isAdmin ? <Crown /> : null}
                {playerInfo.id == player.id ? <Person /> : null}
            </div>
        </div>
    )
}