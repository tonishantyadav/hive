import { format } from 'date-fns'

export function formatTimeStamp(timestamp: Date): string {
  const ts = Math.round(new Date(timestamp).getTime() / 1000)
  const date: Date = new Date(ts * 1000)
  const now: Date = new Date()

  const diff = now.getTime() - date.getTime()
  const secs = diff / 1000
  const mins = secs / 60
  const hrs = mins / 60
  const days = hrs / 24

  switch (true) {
    case Math.floor(days) >= 30:
      return format(new Date(timestamp), TIMESTAMP_FORMAT)
    case Math.floor(days) > 1 && days < 30:
      return format(new Date(timestamp), TIMESTAMP_FORMAT)
    case Math.floor(hrs) >= 1:
      return `${Math.floor(hrs)}h`
    case Math.floor(mins) >= 1:
      return `${Math.floor(mins)}m`
    default:
      return 'now'
  }
}

const TIMESTAMP_FORMAT = 'd MMM yyyy, HH:mm'
