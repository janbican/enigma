# About

Library emulating Enigma machine encrypting/decrypting in Javascript.

It is used for encrypting and decrypting messages.

**Configuration:**
- rotors: I, II, III, IV, V
- reflectors: B, C
- plugboard: up to 13 pairs of letters
- rotor offsets
- rotor ring settings

[More about Enigma](https://en.wikipedia.org/wiki/Enigma_machine)

# Install

`npm install @janbican/enigma`

# Usage

Default Enigma (rotors: I, II, III, reflector: B, offsets: 'AAA', ringSetings: 'AAA', pairs: [])

```javascript
const { Enigma, rotors, reflectors } = require('@janbican/enigma')

const enigma = new Enigma()

const cipher = enigma.convertText('HELLOWORLD')
console.log(cipher)
// ILBDAAMTAZ

```

Enigma with custome settings

```javascript
const { Enigma, rotors, reflectors } = require('@janbican/enigma')

const enigma = new Enigma({
  left: rotors.IV, middle: rotors.V, right: rotors.I,
  reflector: reflectors.C,
  offsets: 'ZTF', ringSettings: 'FDC',
  pairs: ['TF', 'GJ', 'AP', 'MC']
})

const cipher = enigma.convertText('HELLOWORLD')
console.log(cipher)
// CXCIIRIOGA

```

API specification in lib/enigma.js