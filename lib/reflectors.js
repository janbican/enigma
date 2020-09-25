// provides list of reflectors to use in Enigma
// every reflector is defined by alphabet permutation
// values should not change -> based on real reflectors

// models reflector
class Reflector {
  constructor(alphabet) {
    this._alphabet = alphabet
  }
  get alphabet() {
    return this._alphabet
  }
}

// enumeration of all reflectors
const reflectors = {
  B: new Reflector('YRUHQSLDPXNGOKMIEBFZCWVJAT'),
  C: new Reflector('FVPJIAOYEDRZXWGCTKUQSBNMHL')
}

module.exports = {
  Reflector,
  reflectors
}