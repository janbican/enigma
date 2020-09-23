// represents alphabet used in Enigma

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function check(letter) {
  if (typeof letter !== 'string' ||
      letter.length !== 1 ||
      alphabet.indexOf(letter) === -1)
    throw new Error(`not a valid letter: ${letter}`)
}

module.exports = {
  plainAlphabet: alphabet,
  checkLetter: check
}