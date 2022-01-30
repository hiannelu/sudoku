import styles from '../components/Board.module.scss';


const colors = {
  red: '#e64072',
  // blue1: '#e6f7ff',
  blue1: '#caf0f8',
  blue5: '#40a9ff',
  black: '#000000',
  white: '#ffffff',
  gray1: '#f0f2f5'
}

export const cellLayout = (cell, selected, board, inputErr) => {
  const { answer, puzzle, sudoku } = board
  const ans = answer[cell.i][cell.j]
  const val = sudoku[cell.i][cell.j]
  const cur = cell.i === selected.i && cell.j === selected.j
  // const select = selected.val
  const select = selected.i ? sudoku[selected.i][selected.j] : selected.val
  const prefilled = puzzle[cell.i][cell.j]

  const dup = inputErr.includes(cell.i * 9 + cell.j) && !cur

  const startRow = Math.trunc(selected.i / 3) * 3
  const startCol = Math.trunc(selected.j / 3) * 3

  const { red, blue1, blue5, black, white, gray1 } = colors


  // console.log(inputErr)
  let color = red
  let backgroundColor = gray1
  let border = 'none'

  // text color
  if (prefilled) {
    color = black
    backgroundColor = blue1
  }
  else if (cell.val === ans) {
    // color = blue5
    color = cur ? white : blue5
  }
  // if (cell.i === 6) {
  //   console.log(select === val, select, val)
  //   console.log(sudoku)
  // }

  // background color
  if (select && select === val) {
    color = white
    backgroundColor = ((val && ans !== val) || dup) ? red : blue5
  }
  else if (cur) backgroundColor = blue5

  // border with relatives
  for (let i = 0; i < 3; i++) {
    if (selected.i === cell.i) border = `2px solid ${blue5}`

    for (let j = 0; j < 3; j++) {
      if (selected.j === cell.j) border = `2px solid ${blue5}`

      const row = (startRow + i) === cell.i
      const col = (startCol + j) === cell.j
      if (row && col) border = `2px solid ${blue5}`
    }
  }
  return { color, backgroundColor, border }
}

export const checkErr = (selected, sudoku, value, ans) => {
  const
    { i: r, j: c } = selected,
    sr = Math.trunc(r / 3) * 3,
    sc = Math.trunc(c / 3) * 3,
    ret = []

  let row, col, box
  row = col = box = true

  // check duplicate numbers and grid completion
  for (let j = 0; j < 9; j++) {
    const val = sudoku[r][j]
    const index = r * 9 + j

    if (j !== c) {
      if (val === value) ret.push(index)
      else if (!val) row = false
    }
  }

  for (let i = 0; i < 9; i++) {
    const val = sudoku[i][c]
    const index = i * 9 + c

    if (i !== r) {
      if (val === value) ret.push(index)
      else if (!val) col = false
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const val = sudoku[sr + i][sc + j]
      const index = (sr + i) * 9 + sc + j

      if (index !== (r * 9 + c)) {
        if (val === value) ret.push(index)
        else if (!val) box = false
      }
    }
  }
  if (ret.length) {
    const attrs = ret.map(index => `[data-index='${index}']`)
    const cells = document.querySelectorAll(attrs.join(','))

    cells.forEach(x => x.classList.add(styles.inputErr))
    const start = new Date().getTime()

    setTimeout(() => {
      cells.forEach(x => {
        const end = new Date().getTime()
        x.classList.remove(styles.inputErr)
      })
    }, 1000)
  }
  else {
    const cell = document.querySelector(`[data-index='${r * 9 + c}']`)
    cell.classList.add(styles.input)

    setTimeout(() => {
      cell.classList.remove(styles.input)
      shineAnimation({ selected, row, col, box })
    }, 500)
  }
  return ret
}

export const shineAnimation = ({ selected, row, col, box }) => {
  const { i: r, j: c } = selected

  if (row) {
    let left = c, right = c, i = 0
    while (left >= 0 || right < 9) {
      const arr = []
      if (left >= 0) arr.push(`[data-index='${left + r * 9}']`)
      if (right < 9) arr.push(`[data-index='${right + r * 9}']`)
      const select = document.querySelectorAll(`${arr.join(',')}`)
      select.forEach(x => {
        x.classList.add(styles.shine)
        x.style.animationDelay = `${i * 0.05}s`
      })

      setTimeout(() => {
        select.forEach(x => {
          x.classList.remove(styles.shine)
          x.style.animationDelay = '0s'
        })
      }, i * 50 + 1000)

      left = c - i
      right = c + i
      i++
    }
  }
  if (col) {
    let top = r, bottom = r, i = 0
    while (top >= 0 || bottom < 9) {
      const arr = []
      if (top >= 0) arr.push(`[data-index='${top * 9 + c}']`)
      if (bottom < 9) arr.push(`[data-index='${bottom * 9 + c}']`)
      const select = document.querySelectorAll(`${arr.join(',')}`)
      select.forEach(x => {
        x.classList.add(styles.shine)
        x.style.animationDelay = `${i * 0.05}s`
      })

      setTimeout(() => {
        select.forEach(x => {
          x.classList.remove(styles.shine)
          x.style.animationDelay = '0s'
        })
      }, i * 50 + 1000)

      top = r - i
      bottom = r + i
      i++
    }
  }
  if (box) {
    const
      sr = Math.trunc(r / 3) * 3,
      sc = Math.trunc(c / 3) * 3

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const index = (sr + i) * 9 + sc + j
        const cell = document.querySelector(`[data-index='${index}']`)

        cell.classList.add(styles.shine)
        cell.style.animationDelay = `${0.05 * i * j}s`

        setTimeout(() => {
          cell.classList.remove(styles.shine)
          cell.style.animationDelay = '0s'
        }, i * 50 + 1000)
      }
    }
  }
}


