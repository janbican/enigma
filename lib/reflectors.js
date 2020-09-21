// provides list of reflectors to use in Enigma
// every reflector is defined by alphabet permutation
// values should not change, it is based on real reflectors

export class Reflector {
  constructor(alphabet) {
    this._alphabet = alphabet
  }
  get alphabet() {
    return this._alphabet
  }
}

// enumeration of all reflectors
export const reflectors = {
  B: new Reflector('YRUHQSLDPXNGOKMIEBFZCWVJAT'),
  C: new Reflector('FVPJIAOYEDRZXWGCTKUQSBNMHL')
}