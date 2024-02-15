import { Logo } from "../Logo/Logo"
import styles from './homePage.module.scss'
import { IconsComponent } from "../Icons/IconsComponent"
import { toast } from "react-toastify"

export default function HomePage({ hash, setCurrentPage, isOpen, setHash, socket, playerName, setPlayerName }) {
    if (!isOpen) return

    async function createRoom() {
        if (!playerName) {
            toast('Insira seu Nome', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return
        }
        socket.emit('createRoom', { playerName: playerName })
    }

    async function joinRoom() {
        if (!playerName || !hash) {
            toast('Insira o seu nome e o codigo da sala !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
            return
        }
        setCurrentPage('loby')
    }

    socket.on('createdRoom', (data) => {
        console.log(data)
        setHash(data.hash);
        setCurrentPage('loby')
    });

    return (
        <div className={styles.home}>
            <Logo />

            <div className={styles.buttonsWrapper}>
                <div className={styles.nameWrapper}>
                    <input className={`${styles.input}`} onChange={(e) => { setPlayerName(e.target.value) }} placeholder='INSIRA SEU NOME'></input>
                </div>
                <a className={`${styles.button} ${styles.primary}`} onClick={() => { createRoom() }} >Criar uma Sala</a>
                <input className={`${styles.input}`} onChange={(e) => { setHash(e.target.value) }} placeholder='CODIGO DA SALA'></input>
                <a className={`${styles.button} ${styles.primary}`} onClick={() => { joinRoom() }} >Entrar em uma Sala</a>
            </div>
            <IconsComponent />
        </div>
    )
}