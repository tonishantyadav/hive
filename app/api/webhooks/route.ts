import prisma from '@/prisma/client'
import { randName } from '@/utils/random'
import { WebhookEvent } from '@clerk/nextjs/server'
import { error } from 'console'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  const eventType = evt.type

  try {
    if (eventType === 'user.created') {
      const clerkUserId = evt.data.id
      const name = evt.data.first_name + ' ' + evt.data.last_name
      const email = evt.data.email_addresses[0].email_address
      const imageUrl = evt.data.image_url
      const user = await prisma.user.create({
        data: {
          clerkUserId,
          name,
          email,
          imageUrl,
        },
      })
      const myServer = await prisma.myServer.create({
        data: {
          name: randName(),
          userId: user.id,
        },
      })
      await prisma.myChannel.create({
        data: {
          name: 'general',
          myServerId: myServer.id,
        },
      })
    } else if (eventType === 'user.deleted') {
      const clerkUserId = evt.data.id
      const user = await prisma.user.findUnique({
        where: { clerkUserId },
      })
      if (!user) {
        console.log('User not found: ', error)
        return new Response('', { status: 404 })
      }
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      })
    }
  } catch (error) {
    console.log('Error occurred while syncing clerk and db: ', error)
  }

  return new Response('', { status: 200 })
}
