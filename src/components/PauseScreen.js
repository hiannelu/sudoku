import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './PauseScreen.module.scss';


export const StartScreen = () => {
  const dispatch = useDispatch()
  const levels = ['Easy', 'Medium', 'Hard']
  const [pos, setPos] = useState(0)

  return (
    <div className={styles.block}>
      <div
        className={styles.level}
        onClick={() => setPos(pos + 1 > levels.length - 1 ? 0 : pos + 1)}
      >{levels[pos]}</div>
      <div
        className={styles.start}
        onClick={() => {
          dispatch({ type: 'NEW_GAME', level: levels[pos] })
          dispatch({ type: 'PAUSE', pause: false })
        }}
      >Start</div>
    </div>)
}

export const PauseScreen = () => {
  const dispatch = useDispatch()
  const [start, setStart] = useState(false)

  return <div className={`${styles.wrap} ${start ? styles.active : ''}`}>
    <StartScreen />
    <div className={`${styles.block}`}>
      <div
        className={styles.resume}
        onClick={() => dispatch({ type: 'PAUSE', pause: false })}
      >Resume</div>
      <div
        className={styles.game}
        onClick={() => setStart(true)}
      >New game</div>
    </div>
  </div>
}
