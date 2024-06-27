import { Server as NetServer, Socket } from 'net'
import { NextApiResponse as BaseNextApiResponse } from 'next'
import { Server as SocketIOServer } from 'socket.io'

export type NextApiResponse = BaseNextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}
