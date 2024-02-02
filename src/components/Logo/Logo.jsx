import logo from '../../../public/logo.png'
import styles from './logo.module.scss'
export function Logo() {
    return (
        <div className={styles.logo}>
            <img src={logo} />
        </div>
    )
}