// provides list of rotors to use in Enigma
// every rotor is defined by alphabet permutation and notch position
// values should not change, it is based on real rotors

export class Rotor {
  constructor(alphabet, notchPosition) {
    this._alphabet = alphabet
    this._notchPosition = notchPosition
  }
  get alphabet() {
    return this._alphabet
  }
  get notchPosition() {
    return this._notchPosition
  }
}

// enumeration of all rotors
export const rotors = {
  I: new Rotor('EKMFLGDQVZNTOWYHXUSPAIBRCJ', 16),
  II: new Rotor('AJDKSIRUXBLHWTMCQGZNPYFVOE', 4),
  III: new Rotor('BDFHJLCPRTXVZNYEIWGAKMUSQO', 21),
  IV: new Rotor('ESOVPZJAYQUIRHXLNFTGKDCMWB', 9),
  V: new Rotor('VZBRGITYUPSDNHLXAWMJQOFECK', 25),
}