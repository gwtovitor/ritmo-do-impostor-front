import ReactPlayer from 'react-player'
import { Voting } from '../Voting/Voting'
import styles from './playing.module.scss'
import { useEffect, useState } from 'react'

export default function Playing({ isOpen, socket, playerList, playerInfo, start, setStart, hash, setCurrentPage }) {
    const [isOpenVoting, setisOpenVoting] = useState(false)
    const [url, setUrl] = useState('https://www.youtube.com/watch?v=LXb3EKWsInQ')

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
                setisOpenVoting(true)
            }, 3000)
        }
    }, [start])

    if (!isOpen) return
    return (
        <div className={styles.playing}>
            <Voting setUrl={setUrl} setCurrentPage={setCurrentPage} isOpen={isOpenVoting} setOpen={setisOpenVoting} socket={socket} playerInfo={playerInfo} playerList={playerList} hash={hash} />
            {!isOpenVoting ? <ReactPlayer playing={start} width={0} height={0} onReady={() => { socket.emit('iamReady', { hash: hash }) }} url={url} /> : null}
            {!start ? <div style={{ color: 'white' }}>
                Carregando....
            </div> : <div style={{ color: 'white' }}>
                Pronto !
            </div>}
        </div>
    )
}