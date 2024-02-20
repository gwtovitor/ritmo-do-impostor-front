import { useEffect, useState } from 'react'
import styles from './voting.module.scss'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export function ModalStart({ isOpen, setPlay, setOpenModalStart, isImpostor }) {

    const onComplete = ()=>{
        console.log('to cas')
        setPlay(true)
        setOpenModalStart(false)
    }
    return (
        <div className={styles.voting}>

            <CountdownCircleTimer
                isPlaying={isOpen}
                duration={20}
                onComplete={()=>onComplete()}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>


        </div>
    )
}