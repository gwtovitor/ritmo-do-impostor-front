import styles from './playlist.module.scss'

export default function PlayList({img, title, musics}){
  return(
    <div className={styles.playlist}>
        <div>
          <img height={100} width={100} src='https://akamai.sscdn.co/letras/360x360/albuns/4/d/c/c/1159441632761156.jpg'></img>
        </div>
        <div className={styles.playlistData}>
            <span>Pagode 2024</span>
            <span>Menos é mais, Di proposito</span>
        </div>
        <div className={styles.btn}>
          <button>Ver musicas</button>
          <button>Selecionar playlist</button>
        </div>
    </div>
  )
}