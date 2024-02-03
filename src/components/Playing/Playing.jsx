import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
export default function Playing({ isOpen, socket, playerList, playerInfo }) {
    const [play, setPlay] = useState(false)
    useEffect(() => {
        if (play) {
            setTimeout(() => {
                setPlay(false)
            }, 5000)
        }
    }, [play])
    if (!isOpen) return
    return (
        <div>
            <ReactPlayer playing={play} width={0} height={0} onReady={() => { setPlay(true) }} url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
        </div>
    )
}