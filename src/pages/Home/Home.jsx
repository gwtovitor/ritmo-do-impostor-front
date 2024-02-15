
import styles from './home.module.scss'
import { useState } from 'react'
import Loby from '../Loby/Loby'
import HomePage from '../../components/HomePage/HomePage'
import socket from '../../components/socket/socket'
import Playing from '../../components/Playing/Playing'

export default function Home() {
    const [playerList, setPlayerList] = useState(null)
    const [currentPage, setCurrentPage] = useState('homePage')
    const [hash, setHash] = useState(null)
    const [playerName, setPlayerName] = useState('')
    const [playerInfo, setPlayerInfo] = useState(null)
    const [start, setStart] = useState(false)

    socket.on('startTheGame', () => {
        setStart(true)
    })

    socket.on('attList', (playerList) => {
        setPlayerList(playerList);
    });

    socket.on('playerInfo', (playerInfo) => {
        setPlayerInfo(playerInfo)
    })

    socket.on('playerWin', () => {
        console.log('Players WSin')
    })
    socket.on('impostorWin', () => {
        console.log('impostor WSin')
    })

    return (
        <div className={styles.homeWrapper}>
            <HomePage
                hash={hash}
                playerName={playerName}
                setPlayerName={setPlayerName}
                socket={socket}
                setHash={setHash}
                setCurrentPage={setCurrentPage}
                isOpen={openCurrentPage('homePage', currentPage)}
            />
            <Loby
                setPlayerInfo={setPlayerInfo}
                playerInfo={playerInfo}
                playerName={playerName}
                playerList={playerList}
                socket={socket}
                hash={hash}
                setPlayerList={setPlayerList}
                setCurrentPage={setCurrentPage}
                isOpen={openCurrentPage('loby', currentPage)}
            />
            <Playing
                isOpen={openCurrentPage('playing', currentPage)}
                setCurrentPage={setCurrentPage}
                socket={socket}
                playerInfo={playerInfo}
                playerList={playerList}
                hash={hash}
                start={start}
                setStart={setStart}
            />

        </div>
    )
}

function openCurrentPage(page, currentPage) {
    return currentPage === page
}
