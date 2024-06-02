import React from 'react'

const ServersPage = () => {
  return (
    <div className="grid h-full w-full grid-cols-[300px,1fr] divide-x">
      <div className="hidden h-full w-full md:inline-flex lg:inline-flex">
        Channel container
      </div>
      <div className="h-full w-full">Message container</div>
    </div>
  )
}

export default ServersPage
