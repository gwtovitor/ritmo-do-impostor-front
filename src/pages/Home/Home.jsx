import { Musica1, Musica2, Olho1, Raio1 } from '../../lib/icons'
import styles from './home.module.scss'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Logo/Logo'


export default function Home() {
    const [codigo, setCodigo] = useState('')
    const navigate = useNavigate()

    function toLoby() {
        if (!codigo == '') {
            navigate(`/loby/${codigo}`)
            return
        }
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
    return (
        <div className={styles.homeWrapper}>
            <div className={styles.home}>
                <Logo />
                <div className={styles.buttonsWrapper}>
                    <a onClick={() => { toLoby() }}>Criar uma Sala</a>
                    <input onChange={(e) => { setCodigo(e.target.value) }} placeholder='CODIGO DA SALA'></input>
                    <a>Entrar em uma Sala</a>
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