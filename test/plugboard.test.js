import { Plugboard } from './../lib/plugboard.js'
import { alphabet } from './../lib/alphabet.js'

describe('Plugboard', () => {
  test('plain alphabet when created', () => {
    const plugboard = new Plugboard()
    expect(plugboard.alphabet).toBe(alphabet)
  })

  it('alphabet changes when pair is plugged', () => {
    const plugboard = new Plugboard()
    plugboard.plug('AZ')
    expect(plugboard.alphabet).toBe('ZBCDEFGHIJKLMNOPQRSTUVWXYA')
  })

  it('alphabet changes when more pairs are plugged', () => {
    const plugboard = new Plugboard()
    plugboard.plug('MA')
    plugboard.plug('PT')
    plugboard.plug('XQ')
    expect(plugboard.alphabet).toBe('MBCDEFGHIJKLANOTXRSPUVWQYZ')
  })
})