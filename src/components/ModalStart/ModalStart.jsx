/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styles from "./voting.module.scss";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export function ModalStart({
    isOpen,
    start,
    socket,
    hash,
    setOpenModalStart,
}) {
    const [text, setText] = useState("");

    const onComplete = () => {
        socket.emit("iamReady", { hash: hash });
        setText("Aguardando outros jogadores");
    };
    useEffect(() => {
        if (start) {
            setOpenModalStart(false);
        }
    }, [start]);
    return (
        <div className={styles.voting}>
            <CountdownCircleTimer
                isPlaying={isOpen}
                duration={2}
                onComplete={() => onComplete()}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[7, 5, 2, 0]}
            >
                {({ remainingTime }) => {
                    return <div>{text != "" ? text : remainingTime}</div>;
                }}
            </CountdownCircleTimer>
        </div>
    );
}
