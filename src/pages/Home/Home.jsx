
import styles from './home.module.scss'
import { useState } from 'react'
import Loby from '../Loby/Loby'
import HomePage from '../../components/HomePage/HomePage'
import socket from '../../components/socket/socket'
import Playing from '../../components/Playing/Playing'
import EndGame from '../../components/EndGame/EndGame'

export default function Home() {
    const [playerList, setPlayerList] = useState(null)
    const [currentPage, setCurrentPage] = useState('homePage')
    const [hash, setHash] = useState(null)
    const [playerName, setPlayerName] = useState('')
    const [playerInfo, setPlayerInfo] = useState(null)
    const [start, setStart] = useState(false)
    const [music, setMusic] = useState('')
    const [isImpostor, setIsImpostor] = useState(false)
    const [disconnect, setDisconnect] = useState(false)
    const [eliminated, setEliminated] = useState('')

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
    socket.on('toGame', ({ music }) => {
        setCurrentPage('playing')
        setMusic(music)
    })
    socket.on('impostorDisconnect', () => {
        setIsImpostor(true)
        setDisconnect(true)
        setCurrentPage('endGame')
    })
    socket.on('impostorWinDisconnect', () => {
        setIsImpostor(false)
        setDisconnect(true)
        setCurrentPage('endGame')
    })

    socket.on('playerWin', (mostVoted) => {
        setCurrentPage('endGame')
        setDisconnect(false)
        setEliminated(mostVoted)
    })

    socket.on('impostorWin', (mostVoted) => {
        setCurrentPage('endGame')
        setDisconnect(false)
        setEliminated(mostVoted)
        setIsImpostor(true)
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
                playerInfo={playerInfo}
                playerName={playerName}
                setPlayerInfo={setPlayerInfo}
                isOpen={openCurrentPage('loby', currentPage)}
                playerList={playerList}
                socket={socket}
                hash={hash}
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
                music={music}
            />
            <EndGame
                open={openCurrentPage('endGame', currentPage)}
                setCurrentPage={setCurrentPage}
                isImpostor={isImpostor}
                disconnect={disconnect}
                eliminated={eliminated}
                playerList={playerList}
                playerInfo={playerInfo}
            />

        </div>
    )
}

function openCurrentPage(page, currentPage) {
    return currentPage === page
}
