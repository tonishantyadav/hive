import {
  Config,
  animals,
  names,
  uniqueNamesGenerator,
} from 'unique-names-generator'

import { createAvatar } from '@dicebear/core'
import { identicon } from '@dicebear/collection'

const config: Config = {
  separator: ' ',
  style: 'capital',
  dictionaries: [animals, names],
}

export const randName = () => uniqueNamesGenerator(config)

export const randAvatar = (seed: string) => {
  const avatar = createAvatar(identicon, {
    seed,
    size: 50,
  })
  return avatar.toDataUri()
}
