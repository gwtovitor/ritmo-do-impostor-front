import { useState } from 'react'
import styles from './voting.module.scss'


export function Voting({ isOpen, playerList, playerInfo, socket, hash }) {
    const [isVoting, setVoting] = useState(true)
    if (!isOpen) return

    function vote(player) {
        socket.emit('voting', { iAm: playerInfo.id, votedPlayer: player.id, hash: hash })
        setVoting(false)
    }

    return (
        <div className={styles.voting}>
            <div className={styles.wrapperHeader}>
                <p>Votação !</p>
                <span>Click no nome do jogador que deseja eliminar</span>
            </div>
            <div>
                {isVoting ? playerList.map((player, index) => {
                    return (

                        <div key={index} className={styles.player}>
                            {
                                playerInfo.id == player.id ? null : <p className={`${styles.button} ${styles.secundary}`} onClick={() => { vote(player) }}>{player.name}</p>
                            }
                        </div>

                    )
                }) : <p>Você já votou</p>}
            </div>
        </div>
    )
}