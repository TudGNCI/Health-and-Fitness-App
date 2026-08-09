'use client'

import { useUser } from '@clerk/nextjs'

export default function Welcome() {
  const { isSignedIn, user } = useUser()

  if(isSignedIn)
  return (
  <div>Welcome {user?.username}!</div>
  )
}