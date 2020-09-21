import { Rotor, rotors } from './lib/rotors.js'
import { Reflector, reflectors } from './lib/reflectors.js'

const rotor = rotors.I
console.log(rotor.alphabet, rotor.notchPosition)
console.log(rotor instanceof Rotor)

const reflector = reflectors.C
console.log(reflector.alphabet)
console.log(reflector instanceof Reflector)