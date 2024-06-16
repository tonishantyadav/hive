'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUploadThing } from '@/lib/uploadthing'
import { randAvatar } from '@/utils/random'
import { blobToFile, urlToBlob } from '@/utils/uri-to-blob'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const MyServer = ({
  userId,
  myServerId,
  myServerName,
  myServerImage,
}: {
  userId: string
  myServerId: string
  myServerName: string
  myServerImage: string | null
}) => {
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(myServerImage)
  const [uploading, setUploading] = useState<boolean>(false)

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: async (res) => {
      setAvatarUrl(res[0].url)
      try {
        await axios.patch(`/api/my-servers/${myServerId}`, {
          imageUrl: res[0].url,
        })
        router.refresh()
      } catch (error) {
        setAvatarUrl(null)
        setUploading(false)
        console.log(`Unable to update the my server (${myServerName}): `, error)
      }
    },
    onUploadError: () => {
      return null
    },
  })

  const uploadAvatarIfNeeded = useCallback(async () => {
    if (!avatarUrl && !uploading) {
      const blob = await urlToBlob(
        randAvatar(userId + myServerId + myServerName)
      )
      if (!blob) {
        console.error('Failed to convert URL to blob')
        return
      }
      const file = blobToFile(blob, 'avatar.svg')
      await startUpload([file])
    }
    // eslint-disable-next-line
  }, [avatarUrl, uploading])

  useEffect(() => {
    if (!avatarUrl && !uploading) {
      setUploading(true)
      uploadAvatarIfNeeded()
    }
    // eslint-disable-next-line
  }, [avatarUrl, uploading])

  console.log(avatarUrl)

  return (
    <Avatar className="h-10 w-10">
      {avatarUrl && <AvatarImage src={avatarUrl} />}
      <AvatarFallback>{myServerName[0]}</AvatarFallback>
    </Avatar>
  )
}
