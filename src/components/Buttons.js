import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  RiPencilLine as NoteIcon,
  RiLightbulbFlashLine as HintIcon,
} from "react-icons/ri";
import { CgUndo } from "react-icons/cg";
import styles from './Buttons.module.scss';
import { checkErr } from '../utils/layout';


const Buttons = ({ selected }) => {
  const dispatch = useDispatch()
  const { puzzle, sudoku } = useSelector(state => state)
  const [note, setNote] = useState(false)

  const digits = [...Array(9)].map((_, i) => i + 1)

  const handleEdit = val => {
    const { i, j } = selected
    const edit = { i, j, val }

    if (puzzle[i][j]) return


    if (note) {
      if (typeof sudoku[i][j] === 'number') {
        const notes = [...Array(9)].reduce((x, _, i) => ({
          ...x, [i + 1]: val === i + 1
        }), {})
        edit.val = notes
      }
      else {
        sudoku[i][j][val] = !sudoku[i][j][val]
        edit.val = sudoku[i][j]
      }
      dispatch({ type: 'EDIT', edit })
    }
    else {
      dispatch({ type: 'EDIT', edit })
      checkErr(selected, sudoku, val)
    }
  }
  const handleUndo = e => {
    // handleAnimation(e)
  }

  const handleNote = e => {
    // handleAnimation(e)
    setNote(!note)
  }

  // const handleAnimation = e => {
  //   const x = e.clientX - e.currentTarget.offsetLeft
  //   const y = e.clientY - e.currentTarget.offsetTop
  //   const circle = document.createElement('span')

  //   circle.className = styles.circle
  //   circle.style.left = `${x}px`
  //   circle.style.top = `${y}px`
  //   e.currentTarget.appendChild(circle)
  // }

  return (<>
    <div className={styles.buttons}>
      <div className={styles.undo} onClick={handleUndo}><CgUndo /></div>
      <div className={styles.note} onClick={handleNote}><NoteIcon />
        <div className={`${styles.mode} ${note ? styles.on : ''}`}>
          {note ? 'ON' : 'OFF'}
        </div>
      </div>
      <div className={styles.hint} onClick={handleUndo}><HintIcon /></div>
    </div>
    <div className={styles.digits}>
      {digits.map(x => <div key={x} onClick={() => handleEdit(x)}>{x}</div>)}
      <div className={styles.erase} onClick={() =>
        dispatch({ type: 'ERASE', erase: selected })}>X</div>
    </div></>)
}

export default Buttons