import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Board.module.scss';
import { colors } from '../styles/variables';
import { cellLayout, checkErr } from '../utils/layout';
import Timer from './Timer';
import Buttons from './Buttons';


const Board = () => {
  const { answer, puzzle, sudoku, memory } = useSelector(state => state)
  const [selected, setSelected] = useState({})
  const [inputErr, setInputErr] = useState([])

  return (
    <div className={styles.wrap}>
      <div className={styles.board}>
        {sudoku.map((row, i) => {
          return row.map((val, j) => {
            const index = i * 9 + j
            const cell = { i, j, val }
            const board = { answer, puzzle, sudoku }
            const style = cellLayout(cell, selected, board, inputErr)
            const border = style.border === 'none'
              ? '2px solid transparent'
              : style.border

            return typeof val === 'number'
              ? (
                <div key={j}
                  data-index={index}
                  style={style}
                  className={styles.cell}
                  onClick={() => setSelected({ i, j, val })}>
                  {val ? val : ''}
                </div>
              )
              : (
                <div key={j} className={styles.notes} style={{ border }} onClick={() => setSelected({ i, j, val })}>
                  {Object.keys(val).map(x => {
                    return <div key={x} className={styles.note}>{val[x] ? x : ''}</div>
                  })}
                </div>)
          })
        })}
      </div>
      <Timer />
      <Buttons selected={selected} />
    </div>)
}


export default Board