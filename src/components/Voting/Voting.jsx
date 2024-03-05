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
   
    socket.on('tie', () => {
        setModalType('tie')
        setOpenEndVotation(true)
    })

    socket.on('mostVoted', (mostVoted) => {
        setModalType('')
        setOpenEndVotation(true)
        setMostVoted(mostVoted)
    })

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
                                            {player.isImpostor? 'impostor' : ''}
                                        </p>
                                    }
                                </div>
                            )
                        })}
                    </div>
                </div> :
                <div className={styles.eliminated}>
                    <EndVotationModal
                        playerList={playerList}
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