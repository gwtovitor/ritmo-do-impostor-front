import styles from './loby.module.scss'
import PlayerList from '../../components/PlayerList/PlayerList'
import { Toast } from '../../components/Toast/Toast';
import { useState } from 'react';
import { SelectPlaylistModal } from '../../components/SelectPlaylistModal/SelectPlaylistModal';

const playLists = [
    'pagode',
    'rock',
    'mpb'
]
export default function Loby({
    playerInfo,
    playerName,
    isOpen,
    playerList,
    socket,
    hash,
}) {
    const [selectedPlayList, setSelectedPlayList] = useState('')

    if (!isOpen) return

    socket.emit('joinGame', { playerName: playerName, hash: hash });



    function toPlay() {
        if (selectedPlayList == '' || selectedPlayList == 'Selecione uma playlist') {
            Toast('Selecione uma playlist')
            return
        }
        if (playerList.length < 2) {
            Toast('Só é possivel jogar com no mínimo 3 jogadores')
            return
        }

        socket.emit('startGame', { hash: hash, playListName: selectedPlayList })
    }

    const handleSelectChange = (event) => {
        setSelectedPlayList(event.target.value);
    };
    if (!playerList) return
    return (
        <div className={styles.lobyWrapper}>
            <SelectPlaylistModal isOpen={true}/>
            <div className={styles.loby}>
                <div className={styles.hashWrapper}>
                    <div>Click para copiar o codigo</div>
                    <span onClick={() => { navigator.clipboard.writeText(hash) }}>{hash}</span>
                </div>
                {isAdmin(playerList, playerInfo) &&
                    <select onChange={handleSelectChange}>
                        <option>Selecione uma playlist</option>
                        {playLists.map((listName, i) => (
                            <option key={`options_${i}`} value={listName}>{listName}</option>
                        ))}
                    </select>
                }
                <PlayerList playerInfo={playerInfo} playerList={playerList} />
                {isAdmin(playerList, playerInfo) && <button className={`${styles.button} ${styles.startBtn}`} onClick={() => { toPlay() }}>Jogar !</button>}

            </div>
        </div>
    )
}

function isAdmin(playerList, playerInfo) {
    const admin = playerList.find(player => player.isAdmin == true);
    if (admin && admin.id === playerInfo.id) {
        return true;
    }
    return false
}