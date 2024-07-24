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

export const randName = async () => {
  const name = await uniqueNamesGenerator(config)
  return name
}

export async function randAvatar(seed: string) {
  const avatar = createAvatar(initials, {
    seed,
  })
  return avatar.toDataUri()
}

async function uploadWithRetry(file: File, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await utapi.uploadFiles(file)
      if (response) {
        return response.data?.url
      }
    } catch (error) {
      if (attempt < retries) {
        console.log(`Retry attempt ${attempt} failed, retrying...`)
      } else {
        console.log(`All ${retries} attempts failed.`)
        throw error
      }
    }
  }
  return null
}

export async function randImage(key: string) {
  const avatar = await randAvatar(key)
  const blob = await urlToBlob(avatar)
  if (!blob) {
    console.log('Failed to convert URL to Blob')
    return null
  }

  const imageFile = blobToFile(blob, 'random-image.svg')
  if (!imageFile) {
    console.log('Failed to convert Blob to File')
    return null
  }

  const response = await uploadWithRetry(imageFile)
  if (!response) {
    console.log('Failed to upload random image on Uploadthing')
    return null
  }
  return response
}
