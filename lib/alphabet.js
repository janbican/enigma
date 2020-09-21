// represents alphabet used in Enigma

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const length = alphabet.length

export function check(letter) {
  if (alphabet.indexOf(letter) === -1)
    throw new Error(`not a valid letter: ${letter}`)
}