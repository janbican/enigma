const RotorSlot = require('./lib/rotorslot')
const { rotors } = require('./lib/rotors')

const rotorSlot = new RotorSlot(rotors.I)

console.log(rotorSlot.offset)
