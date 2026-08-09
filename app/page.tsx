
import { auth } from '@clerk/nextjs/server'
import { Show, RedirectToSignIn, UserButton } from '@clerk/nextjs'
import MyButtons from './buttons'

export default async function Page() {
    await auth.protect()
  

  return (
    <>
    <Show when="signed-in">
      <header className="flex justify-end items-center p-4 gap-4 h-16 bg-blue-500">
        <UserButton />
      </header>
    </Show>
      <Show when="signed-out">
        <RedirectToSignIn />
      </Show>
      <main>
        <div className="flex justify-center">
          <MyButtons/>
          </div>
      </main>
    </>
  )
}


