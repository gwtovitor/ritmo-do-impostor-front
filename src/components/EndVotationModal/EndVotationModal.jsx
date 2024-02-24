/* eslint-disable react-hooks/exhaustive-deps */

import styles from './endVotationModal.module.scss'

export function EndVotationModal({ isOpen, setIsOpen, modalType, mostVoted, playerInfo}) {
    if(!isOpen) return
    function headerText() {
        if (modalType == 'tie') {
            return 'Votação empatada, ninguém foi eliminado !'
        }
        if (modalType == 'impostor') {
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

    return (
        <div className={`${styles.modal} ${modalType == 'tie' ? styles.tie : ''}`}>
            {headerText()}
            <button className={`${styles.button} ${styles.secundary}`}>Voltar</button>
        </div>
    )
}