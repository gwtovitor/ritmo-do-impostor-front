import styles from './endGame.module.scss'
import impostorWin from '../../../public/Images/impostorWin.jpg'
import playersWin from '../../../public/Images/playersWin.jpg'

export default function EndGame({ open, setCurrentPage, playerInfo, playerList, isImpostor, disconnect }) {
    if (!open) return

    function findImpostor(key) {
        const impostor = playerList.filter((player) => player.isImpostor)
        return impostor[0][key]
    }
    return (
        <div className={styles.disconnect} style={{ backgroundColor: isImpostor ? '#5a396e' : '#facd9d' }}>
            <img style={styles.bgImg} src={isImpostor ? impostorWin : playersWin} />
            {disconnect ?
                isImpostor ?
                    <span>O impostor se desconectou do jogo !</span>
                    :
                    <span>Um jogador se desconectou do jogo</span>
                : isImpostor ?
                    <span>{findImpostor('id') == playerInfo.id ? 'Você venceu' : 'impostor venceu'}</span>
                    :
                    <span>{findImpostor('id') == playerInfo.id ? 'Você perdeu' : 'Jogadores venceram'}</span>
            }
        </div>
    )
}