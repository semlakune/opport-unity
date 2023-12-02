'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className={"w-screen h-screen overflow-hidden flex items-center justify-center flex-col"}>
      <h2>Something went wrong! :(</h2>
      <button
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}