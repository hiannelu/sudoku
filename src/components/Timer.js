import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Timer.module.scss';


const Timer = () => {
  const dispatch = useDispatch()
  let [count, setCount] = useState(0)

  const timer = () => {
    let min = Math.trunc(count / 60)
    let sec = count % 60
    if (min < 10) min = `0${min}`
    if (sec < 10) sec = `0${sec}`
    return `${min}:${sec}`
  }

  useEffect(() => {
    const counter = setInterval(() => setCount(count++), 1000)
    return () => clearInterval(counter)
  }, [])

  return (
    <div className={styles.wrap}>
      <div className={styles.level}>Medium</div>
      <div className={styles.timer}
        onClick={() => dispatch({ type: 'PAUSE', pause: true })}
      >{timer()}</div>
    </div>)
}

export default Timer