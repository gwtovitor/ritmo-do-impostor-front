import ReactPlayer from 'react-player'
import { Voting } from '../Voting/Voting'
import styles from './playing.module.scss'
import { useEffect, useRef, useState } from 'react'
import { ModalStart } from '../ModalStart/ModalStart'

export default function Playing({ isOpen, playList, socket, playerList, playerInfo, start, setStart, hash, setCurrentPage, playlist }) {
    const [isOpenVoting, setisOpenVoting] = useState(false)
    const [url, setUrl] = useState(playList)
    const playerRef = useRef()
    const [openModalStart, setOpenModalStart] = useState(true)
    const [play, setPlay] = useState(false)


    if (!isOpen) return
    return (
        <div className={styles.playing}>
            {openModalStart ?
                <ModalStart isOpen={openModalStart} setOpenModalStart={setOpenModalStart} setPlay={setPlay} />
                :
                <>

                    {!isOpenVoting ?
                        <ReactPlayer ref={playerRef} playing={start} width={0} height={0} onReady={() => { socket.emit('iamReady', { hash: hash }) }} url={'https://www.youtube.com/watch?v=c4XeTP11EI8'} /> :
                        <Voting setUrl={setUrl} setCurrentPage={setCurrentPage} isOpen={isOpenVoting} setOpen={setisOpenVoting} socket={socket} playerInfo={playerInfo} playerList={playerList} hash={hash} />
                    }
                    {!start ? <div style={{ color: 'white' }}>
                        Carregando....
                    </div> : <div style={{ color: 'white' }}>
                        Pronto !
                    </div>
                    }
                </>}
        </div>
    )
}