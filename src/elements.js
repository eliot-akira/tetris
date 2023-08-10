
/**
 * Get html elements.
 */
export const msg = document.getElementById('msg')
export const statsEl = document.getElementById('stats')
// const statsTime = document.getElementById('time')

export const statsLines = document.getElementById('line')
export const statsPiece = document.getElementById('piece')

export const h3 = document.getElementsByTagName('h3')

// Get canvases and contexts
export const holdCanvas = document.getElementById('hold')
export const bgStackCanvas = document.getElementById('bgStack')
export const stackCanvas = document.getElementById('stack')

export const activeCanvas = document.getElementById('active')
export const previewCanvas = document.getElementById('preview')

export const spriteCanvas = document.getElementById('sprite')

export const holdCtx = holdCanvas.getContext('2d')
export const bgStackCtx = bgStackCanvas.getContext('2d')

export const stackCtx = stackCanvas.getContext('2d')

export const activeCtx = activeCanvas.getContext('2d')
export const previewCtx = previewCanvas.getContext('2d')
export const spriteCtx = spriteCanvas.getContext('2d')
