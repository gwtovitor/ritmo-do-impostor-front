import styles from './endGame.module.scss'
import impostorWin from '../../../public/Images/impostorWin.jpg'
import playersWin from '../../../public/Images/playersWin.webp'

export default function EndGame({ open, setCurrentPage, playerInfo, playerList, isImpostor, disconnect }) {
    if (!open) return

    function findImpostor(key) {
        const impostor = playerList.filter((player) => player.isImpostor)
        return impostor[0][key]
    }
    return (
        <div className={styles.disconnect} style={{ backgroundColor: isImpostor ? '#5a396e' : '#facd9d' }}>
            {disconnect ?
                isImpostor ?
                    <span>O impostor se desconectou do jogo !</span>
                    :
                    <span>Um jogador se desconectou do jogo</span>
                : isImpostor ?
                    <span>{findImpostor('id') == playerInfo.id ? 'Você venceu' : 'impostor venceu'}</span>
                    :
                    <div className={styles.textWrapper}>
                        <span >{findImpostor('id') == playerInfo.id ? 'Você perdeu' : 'Jogadores venceram'}</span>
                        <button className={`${styles.button} ${styles.primary}`}>Voltar ao menu</button>
                    </div>

            }
            <img className={styles.bgImg} src={isImpostor ? impostorWin : playersWin} />
        </div>
    )
}