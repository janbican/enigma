// represents alphabet used in Enigma
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// checks if letter is valid 
function check(letter) {
  if (typeof letter !== 'string' ||
      letter.length !== 1 ||
      alphabet.indexOf(letter.toUpperCase()) === -1)
    throw new Error(`${letter} is not a valid letter`)
}

module.exports = {
  plainAlphabet: alphabet,
  checkLetter: check
}