/* eslint-disable react-hooks/exhaustive-deps */
import styles from './loby.module.scss'

import PlayerList from '../../components/PlayerList/PlayerList'

// import { useEffect } from 'react'


export default function Loby({
    setPlayerInfo,
    playerInfo,
    playerName,
    isOpen,
    setPlayerList,
    playerList,
    socket,
    hash,
    setCurrentPage
}) {

    if (!isOpen) return
    socket.emit('joinGame', { playerName: playerName, hash: hash });

    socket.on('attList', (playerList) => {
        setPlayerList(playerList);
    });

    socket.on('playerInfo', (playerInfo) => {
        setPlayerInfo(playerInfo)
    })

    function toPlay() {
        // if (playerList.length < 2) return
        socket.emit('startGame', { hash: hash })
        // setCurrentPage('playing')
    }

    if (!playerList) return
    return (
        <div className={styles.lobyWrapper}>
            <div className={styles.loby}>
                <div className={styles.hashWrapper}>
                    <div>Click para copiar o codigo</div>
                    <span onClick={() => {navigator.clipboard.writeText(hash)}}>{hash}</span>
                </div>
                <PlayerList playerInfo={playerInfo} playerList={playerList} />
                {isAdmin(playerList, playerInfo) && <button onClick={() => { toPlay() }}>Teste</button>}
                
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