import ReactPlayer from 'react-player'
import { Voting } from '../Voting/Voting'
export default function Playing({ isOpen, socket, playerList, playerInfo, start, setStart, hash }) {

    if (!isOpen) return
    return (
        <div>
            <Voting isOpen={true} socket={socket} playerInfo={playerInfo} playerList={playerList} hash={hash} />
            <ReactPlayer playing={start} width={0} height={0} onReady={() => { socket.emit('iamReady', { hash: hash }) }} url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
            {!start ? <div style={{ color: 'white' }}>
                Carregando....
            </div> : <div style={{ color: 'white' }}>
                Pronto !
            </div>}
        </div>
    )
}