'use server'

import { blobToFile, urlToBlob } from '@/utils/url-to-blob'
import { initials } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import {
  Config,
  animals,
  names,
  uniqueNamesGenerator,
} from 'unique-names-generator'
import { UTApi } from 'uploadthing/server'

const utapi = new UTApi()

const config: Config = {
  separator: ' ',
  style: 'capital',
  dictionaries: [animals, names],
}

export const randName = async () => await uniqueNamesGenerator(config)

export async function randAvatar(seed: string) {
  const avatar = createAvatar(initials, {
    seed,
  })
  return avatar.toDataUri()
}

export async function randImage(key: string) {
  const avatar = await randAvatar(key)
  const blob = await urlToBlob(avatar)
  if (!blob) {
    console.log('Failed to convert URL to Blob')
    return null
  }

  const imageFile = blobToFile(blob!, 'random-image.svg')
  if (!imageFile) {
    console.log('Failed to convert Blob to File')
    return null
  }

  const response = await utapi.uploadFiles(imageFile)
  if (!response) {
    console.log('Failed to upload random image on Uploadthing')
    return null
  }
  return response.data!.url
}
