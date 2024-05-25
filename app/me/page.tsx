import React from 'react'

const MyPage = () => {
  return (
    <div className="grid h-screen md:grid-cols-[4%_31%_65%] lg:grid-cols-[4%_31%_65%]">
      <div className="hidden h-full w-full bg-black/35 md:inline-flex lg:inline-flex">
        Server List
      </div>
      <div className="hidden h-full w-full bg-black/10 md:inline-flex lg:inline-flex">
        Channel List
      </div>
      <div className="h-full w-full">Message Box</div>
    </div>
  )
}

export default MyPage
