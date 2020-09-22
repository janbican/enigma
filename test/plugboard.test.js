import { Plugboard } from './lib/plugboard'
import { alphabet } from './lib/alphabet'

describe('Plugboard', () => {
  it('has plain alphabet when created', () => {
    const plugboard = new Plugboard()
    expect(plugboard.alphabet).toBe(alphabet)
  })
})