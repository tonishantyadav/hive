'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUploadThing } from '@/lib/uploadthing'
import { randAvatar } from '@/utils/random'
import { blobToFile, urlToBlob } from '@/utils/uri-to-blob'
import axios from 'axios'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

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
  const pathname = usePathname()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(serverImage)
  const [uploading, setUploading] = useState<boolean>(false)

  const isDefault = pathname ? pathname.includes(serverId) : false

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
    <Link
      href={`/servers/${serverId}/channels/${channelId}`}
      className="group relative flex h-10 w-10 gap-4 rounded-full"
    >
      <div
        className={cn(
          'relative right-3 w-1 rounded-full bg-white group-hover:inline-block',
          !isDefault ? 'hidden' : ''
        )}
      />{' '}
      {avatarUrl ? (
        <Image
          className="rounded-full hover:rounded-xl"
          fill
          src={avatarUrl}
          alt="Default server image"
          sizes="33vw"
        />
      ) : (
        <Avatar className="h-10 w-10">
          <AvatarFallback>{serverName[0]}</AvatarFallback>
        </Avatar>
      )}
    </Link>
  )
}
