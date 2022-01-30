import { useSelector, useDispatch } from 'react-redux';
import styles from './App.module.scss';
import Board from './components/Board';
import { StartScreen, PauseScreen } from './components/PauseScreen';


const App = () => {
  const dispatch = useDispatch()
  const { sudoku, pause } = useSelector(state => state)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>Sudoku</div>
      <div className={styles.content}>
        {sudoku.length ? pause ? <PauseScreen /> : <Board /> : <StartScreen />}
      </div>
    </div>)
}

export default App;
