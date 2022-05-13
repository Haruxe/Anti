import React from 'react'

function NotFound() {
  return (
      <div className='p-10'>
          <div className='bg-[#00000016] w-screen h-screen rounded-sm flex flex-col'>
                <h1 className='p-10 text-5xl text-white'>
                The page you requested does not exist!
                </h1>
            </div>
      </div>
  )
}

export default NotFound