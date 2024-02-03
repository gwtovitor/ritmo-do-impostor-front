import { Musica1, Musica2, Olho1, Raio1 } from '../../lib/icons'
import styles from './iconsComponent.module.scss'

export function IconsComponent() {
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