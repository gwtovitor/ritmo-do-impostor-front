import ReactPlayer from 'react-player'
import { Voting } from '../Voting/Voting'
import styles from './playing.module.scss'
import { useEffect, useRef, useState } from 'react'
import { ModalStart } from '../ModalStart/ModalStart'

export default function Playing({ isOpen, music, socket, playerList, playerInfo, start, setStart, hash, setCurrentPage }) {
    const [isOpenVoting, setisOpenVoting] = useState(false)
    const playerRef = useRef()
    const [openModalStart, setOpenModalStart] = useState(true)

    socket.on('tie',()=> {
        /// inserir um modal de empate
        setisOpenVoting(false)
        setOpenModalStart(true)
    })
    socket.on('impostorWin',()=> {
        console.log('impostorWin')
    })
    socket.on('mostVoted',(mostVoted)=> {
        console.log(mostVoted)
    })

    useEffect(() => {
        if (start) {
            setOpenModalStart(false)
            setTimeout(() => {
                setStart(false)
                setisOpenVoting(true)
            }, 10000)
        }
    }, [start])

    if (!isOpen) return
    return (
        <div className={styles.playing}>
            {openModalStart ?
                <ModalStart socket={socket} hash={hash} isOpen={openModalStart} setOpenModalStart={setOpenModalStart} />
                :
                <>
                    {!isOpenVoting ?
                        <ReactPlayer ref={playerRef} playing={start} width={0} height={0} url={music} /> :
                        <Voting setCurrentPage={setCurrentPage} isOpen={isOpenVoting} setOpen={setisOpenVoting} socket={socket} playerInfo={playerInfo} playerList={playerList} hash={hash} />
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