import { useState } from 'react'
import styles from './voting.module.scss'


export function Voting({ isOpen, playerList, playerInfo, socket, hash, setOpen, setCurrentPage }) {
    const [isVoting, setVoting] = useState(true)

    const [eliminated, setElemitad] = useState('')

    if (!isOpen) return

    function vote(player) {
        socket.emit('voting', { iAm: playerInfo.id, votedPlayer: player.id, hash: hash })
        setVoting(false)
    }

    socket.on('mostVoted', (eliminated) => {
        setElemitad(eliminated)
    })

    function prepared(){
        setOpen(false)
        setVoting(true)
        setElemitad('')
    }

    function goToLoby(){
        setOpen(false)
        setCurrentPage('loby')
    }

    return (
        <div className={styles.voting}>
            {isVoting ?
                <div className={styles.wrapperVoting}>
                    <div className={styles.wrapperHeader}>
                        <p>Votação !</p>
                        <span>Click no nome do jogador que deseja eliminar</span>
                    </div>
                    <div className={styles.mapWrapper}>
                        {playerList.map((player, index) => {
                            return (
                                <div key={index} className={styles.player}>
                                    {playerInfo.id == player.id || player.isEliminated ? null :
                                        <p
                                            className={`${styles.button} ${styles.secundary}`}
                                            onClick={() => { vote(player) }}
                                        >
                                            {player.name}
                                        </p>
                                        }
                                </div>
                            )
                        })}
                    </div>
                </div> :
                <div className={styles.eliminated}>
                    {eliminated ?
                        <div className={styles.voted}>
                            {eliminated.id == playerInfo.id ? <>Você foi eliminado <button onClick={()=>{goToLoby()}} className={`${styles.button} ${styles.secundary}`}>Voltar ao Loby ?</button></> :<> O jogador eliminado foi: {eliminated.name} <button onClick={()=>{prepared()}} className={`${styles.button} ${styles.prepare}`}>Preparado ?</button></>}
                            
                        </div>
                        :
                        <span>Aguardando outros jogadores votarem !</span>
                    }

                </div>
            }

        </div>
    )
}