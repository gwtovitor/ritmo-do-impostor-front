import { useState } from 'react'
import styles from './voting.module.scss'
import { EndVotationModal } from '../EndVotationModal/EndVotationModal'


export function Voting({ isOpen, setOpenModalStart, playerList, playerInfo, socket, hash, setOpen, setCurrentPage }) {
    const [isVoting, setVoting] = useState(true)

    const [openEndVotation, setOpenEndVotation] = useState(false)
    const [modalType, setModalType] = useState(null)
    const [mostVoted, setMostVoted] = useState(null)
  
    if (!isOpen) return

    function vote(player) {
        socket.emit('voting', { iAm: playerInfo.id, votedPlayer: player.id, hash: hash })
        setVoting(false)
    }
    function tieFunction() {
        console.log('aqui')
        // setOpenModalStart(true)
        // setOpen(false)
    }
 
    socket.on('tie', () => {
        setModalType('tie')
        setOpenEndVotation(true)
    })

    socket.on('impostorWin', () => {
        console.log('impostorWin')
    })
    socket.on('mostVoted', (mostVoted) => {
        console.log(mostVoted)
    })

    function prepared() {
        setOpen(false)
        setVoting(true)
        setEliminated('')
    }

    function goToLoby() {
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
                    <EndVotationModal
                        isOpen={openEndVotation}
                        setIsOpen={setOpenEndVotation}
                        modalType={modalType}
                        mostVoted={mostVoted}
                        playerInfo={playerInfo}
                        setOpenModalStart={setOpenModalStart}
                        setOpenVoting={setOpen}
                    />
                </div>
            }

        </div>
    )
}