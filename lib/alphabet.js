// represents alphabet used in Enigma

export const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function check(letter) {
  if (typeof letter !== 'string' ||
      letter.length !== 1 ||
      alphabet.indexOf(letter) === -1)
    throw new Error(`not a valid letter: ${letter}`)
}