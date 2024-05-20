/* eslint-disable react-hooks/exhaustive-deps */

import PlayList from "../Playlist/Playlist";
import styles from "./selectPlaylistModal.module.scss";

export function SelectPlaylistModal({ isOpen, setOpen }) {
    if (!isOpen) return;

    return (
        <div className={styles.wrapper}>
            <PlayList></PlayList>
            <PlayList></PlayList>
            <PlayList></PlayList>
            <PlayList></PlayList>
            <PlayList></PlayList>
            <PlayList></PlayList>
            <PlayList></PlayList>
            <PlayList></PlayList>
            <PlayList></PlayList>
            <PlayList></PlayList>
            <PlayList></PlayList>
            <PlayList></PlayList>
        </div>
    );
}
