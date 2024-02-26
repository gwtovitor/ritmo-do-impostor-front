/* eslint-disable react-hooks/exhaustive-deps */

import styles from './endVotationModal.module.scss'

export function EndVotationModal({ isOpen, setIsOpen, playerList, modalType, mostVoted, playerInfo, setOpenVoting, setOpenModalStart }) {
    if (!isOpen) return

    function findImpostor(key) {
        const impostor = playerList.filter((player) => player.isImpostor)
        return impostor[0][key]
    }

    function headerText() {
        if (modalType == 'tie') {
            return 'Votação empatada, ninguém foi eliminado !'
        }
        if (modalType == 'impostorWin') {
            if (mostVoted.id == playerInfo.id) {
                return `Você foi eliminado, o impostor ${findImpostor('name')} venceu !`
            }
            if(findImpostor('id') == playerInfo.id){
                return `Os jogadores eliminaram ${mostVoted.name}, você era impostor e venceu !`
            }
            return `Vocês eliminaram ${mostVoted.name}, o impostor ${findImpostor('name')} venceu`
        }
        if (modalType == 'playersWin') {
            if (mostVoted.id == playerInfo.id) {
                return 'Você era o impostor e foi eliminado !'
            }
            return `O impostor era ${mostVoted.name}, Parabéns vocês venceram !`
        }
        if (mostVoted.id == playerInfo.id) {
            return 'Você foi eliminado !'
        }

        return `O jogador ${mostVoted.name} foi eliminado, mas não era o impostor !`
    }

    function handleButtonClick() {
        if (modalType === 'tie') {
            tie();
            return
        }
        window.location.reload()
    }


    function tie() {
        setOpenModalStart(true)
        setOpenVoting(false)
        setIsOpen(false)
    }

    return (
        <div className={`${styles.modal} ${modalType == 'tie' ? styles.tie : ''}`}>
            {headerText()}
            <button onClick={() => { handleButtonClick() }} className={`${styles.button} ${styles.secundary}`}>Voltar</button>
        </div>
    )
}