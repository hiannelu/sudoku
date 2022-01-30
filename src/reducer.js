import { createStore } from 'redux';
import { solveGrid, removeNumbers } from './utils/generation';


const init = {
  answer: [],
  puzzle: [],
  sudoku: [],
  memory: {},
  level: 'Easy',
  pause: false,
}

const rootReducer = (state = init, action) => {
  let { sudoku, memory } = state
  let i, j, val

  switch (action.type) {
    case 'NEW_GAME':
      const { grid } = solveGrid()
      const data = removeNumbers(grid, action.level)
      const sudo = JSON.parse(JSON.stringify(data.puzzle))
      state.start = false
      return { ...state, ...data, sudoku: sudo }
    case 'PAUSE':
      return { ...state, pause: action.pause }
    case 'LEVEL':
      return { ...state, level: action.level }
    case 'EDIT':
      i = action.edit.i
      j = action.edit.j
      val = action.edit.val
      sudoku = state.sudoku

      memory = { i, j, val: sudoku[i][j] }
      sudoku[i][j] = val

      return { ...state, memory }
    case 'ERASE':
      i = action.erase.i
      j = action.erase.j

      if (!state.puzzle[i][j]) {
        memory = { i, j, val: sudoku[i][j] }
        sudoku[i][j] = 0
      }
      return { ...state, memory }
    case 'UNDO':
      if (Object.keys(memory).length) {
        i = memory.i
        j = memory.j
        val = memory.val
        memory = {}
        sudoku[i][j] = val
      }

      return { ...state, memory }
    default:
      return state
  }
}

const store = createStore(rootReducer)

export default store;