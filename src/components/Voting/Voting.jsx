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
            <p>Votação !</p>
            <div>
                {isVoting ? playerList.map((player, index) => {
                    return (

                        <div key={index} className={styles.player}>
                            {
                                playerInfo.id == player.id ? null : <p onClick={() => { vote(player) }}>{player.name}</p>
                            }
                        </div>

                    )
                }) : <p>Você já votou</p>}
            </div>
        </div>
    )
}