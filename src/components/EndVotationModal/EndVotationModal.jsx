/* eslint-disable react-hooks/exhaustive-deps */

import styles from './endVotationModal.module.scss'

export function EndVotationModal({ isOpen, setIsOpen, modalType, mostVoted, playerInfo, setOpenVoting, setOpenModalStart }) {
    if (!isOpen) return

    function headerText() {
        if (modalType == 'tie') {
            return 'Votação empatada, ninguém foi eliminado !'
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