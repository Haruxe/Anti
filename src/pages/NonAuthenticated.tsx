import React from 'react'

function NonAuthenticated() {
  return (
    <div className='p-10'>
      <div className='bg-[#00000016] w-screen h-screen rounded-sm flex flex-col'>
        <h1 className='p-10 text-4xl text-white'>
          Please click "Connect Your Wallet!"
        </h1>
      </div>
    </div>
  )
}

export default NonAuthenticated