const Enigma = require('./lib/enigma')

const enigma = new Enigma()

for (const letter of 'AAAAA')
  console.log(enigma.convert(letter))
