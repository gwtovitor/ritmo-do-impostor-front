/* eslint-disable react-hooks/exhaustive-deps */
import styles from './loby.module.scss'
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'
import PlayerList from '../../components/PlayerList/PlayerList'
import { useParams } from 'react-router-dom'
const players = [
    'Vitor',
    'Pedro',
    'Teste'
]
const randomIndex = Math.floor(Math.random() * players.length);

export default function Loby() {
   
    const [playerList, setPlayerList] = useState(null)
    const { id } = useParams();
    const socket = io('http://localhost:5000');
    const [admin, setAdmin] = useState(false)
    const joinGameSent = useRef(false)

    useEffect(() => {
        socket.on('attList', (listaDeJogadores) => {
            setPlayerList(listaDeJogadores);
            console.log(listaDeJogadores, '🙄🙄');
        });
        if (!joinGameSent.current) {
            socket.emit('joinGame', { nomeDoJogador: players[randomIndex], roomHash: id });
            joinGameSent.current = true; 
        }
        return () => {
            socket.off('attList');
        };
    }, [id]); 

    return (
        <div className={styles.lobyWrapper}>
            <div className={styles.loby}>
                <PlayerList playerList={playerList} />
                {admin && <button>Começar o jogo</button>}
            </div>
        </div>
    )
}
