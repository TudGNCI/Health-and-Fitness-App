'use client'

import { useUser } from '@clerk/nextjs'

export default function Welcome() {
    const {
        isSignedIn,
        user
    } = useUser()

    if (isSignedIn)
        return (
            <div className="pt-[5vh] text-5xl">Welcome {user?.username}!</div>
        )
}