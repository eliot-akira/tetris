import { init, resize, menu, unpause, state } from './tetris'

resize()
init(0)
// menu(0)

// For actions from HTML
window.tetris = {
  init,
  menu,
  unpause,
  state
}
