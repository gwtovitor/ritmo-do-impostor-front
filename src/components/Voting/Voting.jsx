import styles from './voting.module.scss'


export function Voting({ isOpen, playerList, playerInfo, socket, hash }) {
    if (!isOpen) return

    return (
        <div className={styles.voting}>
            Votação !
            {playerList.map((player, index) => {
                return (

                    <div style={{ display: 'flex', gap: '23px' }} key={index} className={styles.iconsWrapper}>
                        <p>{player.name}</p>
                        {
                            playerInfo.id == player.id ? null : <button onClick={() => { socket.emit('voting', { iAm: playerInfo.id, votedPlayer: player.id, hash: hash }) }}>Teste</button>
                        }
                    </div>

                )
            })}
        </div>
    )
}