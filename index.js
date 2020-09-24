const Enigma = require('./lib/enigma')
const { rotors } = require('./lib/rotors')
const { reflectors } = require('./lib/reflectors')


const enigma = new Enigma(rotors.I, rotors.II, rotors.III, 'AAA', 'AAA', reflectors.B, [])

for (const letter of 'AAAAA')
  console.log(enigma.convert(letter))
