import { Logo } from "../Logo/Logo";
import styles from "./homePage.module.scss";
import { IconsComponent } from "../Icons/IconsComponent";
import { Toast } from "../Toast/Toast";
import textLogo from "../../../public/Images/logo/textLogo.png";
import menu1 from "../../../public/Images/menu/menu1.png";
import menu2 from "../../../public/Images/menu/menu2.png";
import menu8 from "../../../public/Images/menu/menu8.png";
import menu4 from "../../../public/Images/menu/menu4.png";
import menu5 from "../../../public/Images/menu/menu5.png";
import menu7 from "../../../public/Images/menu/menu7.png";
import iconsStyles from "./iconsStyles.module.scss";

export default function HomePage({
    hash,
    setCurrentPage,
    isOpen,
    setHash,
    socket,
    playerName,
    setPlayerName,
}) {
    if (!isOpen) return;

    async function createRoom() {
        if (!playerName) {
            Toast("Insira seu Nome");
            return;
        }
        socket.emit("createRoom", { playerName: playerName });
    }

    async function joinRoom() {
        if (!playerName || !hash) {
            Toast("Insira o seu nome e o codigo da sala !");
            return;
        }
        setCurrentPage("loby");
    }

    socket.on("createdRoom", (data) => {
        setHash(data.hash);
        setCurrentPage("loby");
    });

    return (
        <div className={styles.home}>
            <div className={styles.body}>
                <img src={textLogo} className={styles.logo} />
                <img
                    className={`${iconsStyles.icons} ${iconsStyles.menu1}`}
                    src={menu1}
                />
                <img
                    className={`${iconsStyles.icons} ${iconsStyles.menu2}`}
                    src={menu2}
                />
                {/* <img
                    className={`${iconsStyles.icons} ${iconsStyles.menu8}`}
                    src={menu8}
                /> */}
                <img
                    className={`${iconsStyles.icons} ${iconsStyles.menu4}`}
                    src={menu4}
                />
                {/* <img
                    className={`${iconsStyles.icons} ${iconsStyles.menu5}`}
                    src={menu5}
                /> */}
                <img
                    className={`${iconsStyles.icons} ${iconsStyles.menu7}`}
                    src={menu7}
                />
                <div className={styles.buttonsWrapper}>
                    <a
                        className={`${styles.button} ${styles.primary}`}
                        onClick={() => {
                            createRoom();
                        }}
                    >
                        Criar uma Sala
                    </a>
                    <div className={styles.inputWrapper}>
                        <input
                            className={`${styles.input}`}
                            onChange={(e) => {
                                setHash(e.target.value);
                            }}
                            placeholder="CODIGO DA SALA"
                        ></input>
                        <a
                            className={`${styles.customBtn}`}
                            onClick={() => {
                                joinRoom();
                            }}
                        >
                            Entrar em uma Sala
                        </a>
                    </div>
                </div>
            </div>
            {/* <Logo /> */}
            {/* <div className={styles.buttonsWrapper}>
                <div className={styles.nameWrapper}>
                    <input className={`${styles.input}`} onChange={(e) => { setPlayerName(e.target.value) }} placeholder='INSIRA SEU NOME'></input>
                </div>
                <a className={`${styles.button} ${styles.primary}`} onClick={() => { createRoom() }} >Criar uma Sala</a>
                <input className={`${styles.input}`} onChange={(e) => { setHash(e.target.value) }} placeholder='CODIGO DA SALA'></input>
                <a className={`${styles.button} ${styles.primary}`} onClick={() => { joinRoom() }} >Entrar em uma Sala</a>
            </div> */}
            {/* <IconsComponent /> */}
        </div>
    );
}
