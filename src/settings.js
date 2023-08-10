import { range } from './utils'

export const set = document.getElementById('settings')

export const settings = {
  DAS: 10,
  ARR: 1,
  Gravity: 0,
  'Soft Drop': 31,
  'Lock Delay': 30,
  Size: 0,
  Sound: 0,
  Volume: 100,
  Block: 0,
  Ghost: 1,
  Grid: 1,
  Outline: 0,
}

export const setting = {
  DAS: range(0, 31),
  ARR: range(0, 11),
  Gravity: (function () {
    const array = []
    array.push('Auto')
    array.push('0G')
    for (let i = 1; i < 64; i++) array.push(i + '/64G')
    for (let i = 1; i <= 20; i++) array.push(i + 'G')
    return array
  })(),
  'Soft Drop': (function () {
    const array = []
    for (let i = 1; i < 64; i++) array.push(i + '/64G')
    for (let i = 1; i <= 20; i++) array.push(i + 'G')
    return array
  })(),
  'Lock Delay': range(0, 101),
  Size: ['Auto', 'Small', 'Medium', 'Large'],
  Sound: ['Off', 'On'],
  Volume: range(0, 101),
  Block: ['Shaded', 'Solid', 'Glossy', 'Arika', 'World'],
  Ghost: ['Normal', 'Colored', 'Off'],
  Grid: ['Off', 'On'],
  Outline: ['Off', 'On'],
}
