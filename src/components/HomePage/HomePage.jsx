import { Logo } from "../Logo/Logo"
import styles from './homePage.module.scss'
import { IconsComponent } from "../Icons/IconsComponent"

export default function HomePage({ setCurrentPage, isOpen, setHash, socket, playerName, setPlayerName }) {

    async function createRoom() {
        if (!isOpen) return
        if(!playerName) return
        socket.emit('createRoom', {playerName: playerName})
    }
    
    socket.on('createdRoom', (data) => {
        setHash(data.hash);
        setCurrentPage('loby')
    });
    if (!isOpen) return

    return (
        <div className={styles.home}>
            <Logo />

            <div className={styles.buttonsWrapper}>
                <div className={styles.nameWrapper}>
                    <input onChange={(e) => { setPlayerName(e.target.value) }} placeholder='INSIRA SEU NOME'></input>
                </div>
                <a onClick={() => { createRoom() }} >Criar uma Sala</a>
                <input onChange={(e) => { setHash(e.target.value) }} placeholder='CODIGO DA SALA'></input>
                <a onClick={() => { setCurrentPage('loby') }} >Entrar em uma Sala</a>
            </div>
            <IconsComponent />
        </div>
    )
}