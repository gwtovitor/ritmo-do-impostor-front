import styles from './playerList.module.scss'
export default function PlayerList({ playerList }) {
    if (!playerList) return
    console.log(playerList)
     return (
        <div className={styles.playerList}>
            <div className={styles.playersWrapper}>
                {playerList.map((player, index) => {
                    return (
                        <div key={index} className={styles.player}>
                            <span>{player.nome}</span>
                            <div style={{backgroundColor: player.admin ? 'green': 'red'}}className={styles.circle}></div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}