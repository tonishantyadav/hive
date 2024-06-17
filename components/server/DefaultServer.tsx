'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUploadThing } from '@/lib/uploadthing'
import { randAvatar } from '@/utils/random'
import { blobToFile, urlToBlob } from '@/utils/uri-to-blob'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export const DefaultServer = ({
  userId,
  serverId,
  serverName,
  serverImage,
  channelId,
}: {
  userId: string
  serverId: string
  serverName: string
  serverImage: string | null
  channelId: string
}) => {
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(serverImage)
  const [uploading, setUploading] = useState<boolean>(false)

  const { startUpload } = useUploadThing('imageUploader', {
    onClientUploadComplete: async (res) => {
      setAvatarUrl(res[0].url)
      try {
        await axios.patch(`/api/servers/${serverId}`, {
          imageUrl: res[0].url,
        })
        router.refresh()
      } catch (error) {
        setAvatarUrl(null)
        setUploading(false)
        console.log(
          `Unable to update the default server image (${serverName}): `,
          error
        )
      }
    },
    onUploadError: () => {
      return null
    },
  })

  const uploadAvatarIfNeeded = useCallback(async () => {
    if (!avatarUrl && !uploading) {
      const blob = await urlToBlob(randAvatar(userId + serverId + serverName))
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

  return (
    <Link href={`/servers/${serverId}/channels/${channelId}`}>
      <Avatar className="h-10 w-10">
        {avatarUrl && <AvatarImage src={avatarUrl} />}
        <AvatarFallback>{serverName[0]}</AvatarFallback>
      </Avatar>
    </Link>
  )
}
