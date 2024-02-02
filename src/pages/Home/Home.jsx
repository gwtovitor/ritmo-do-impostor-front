import { Musica1, Musica2, Olho1, Raio1 } from '../../lib/icons'
import styles from './home.module.scss'
import logo from '../../../public/logo.png'
import io from 'socket.io-client'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'


export default function Home() {
    const [codigo, setCodigo] = useState('')
    const socket = useRef(null);
    useEffect(() => {
        socket.current = io.connect('http://localhost:5000');
        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, []);

    function connectSocket() {
        if (codigo == '') {
            toast.error('🙄 Preencha o codigo da sala', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        console.log('Connecting and emitting to "teste"');
        if (socket.current) {
            socket.current.emit('teste', 'vitor');
        }
    }
    return (
        <div className={styles.homeWrapper}>
            <div className={styles.home}>
                <div className={styles.logo}>
                    <img src={logo} />
                </div>
                <div className={styles.buttonsWrapper}>
                    <a onClick={() => { connectSocket() }}>Criar uma Sala</a>
                    <input onChange={(e) => { setCodigo(e.target.value) }} placeholder='CODIGO DA SALA'></input>
                    <a onClick={() => { connectSocket() }}>Entrar em uma Sala</a>
                </div>

                <Icons />

            </div>
        </div>
    )
}

export function Icons() {
    return (
        <>
            <div className={`${styles.icons} ${styles.eye}`}>
                <Olho1 />
            </div>
            <div className={`${styles.icons} ${styles.music1}`}>
                <Musica1 />

            </div>
            <div className={`${styles.icons} ${styles.music2}`}>
                <Musica2 />
            </div>
            <div className={`${styles.icons} ${styles.rain}`}>
                <Raio1 />
            </div>
        </>
    )
}