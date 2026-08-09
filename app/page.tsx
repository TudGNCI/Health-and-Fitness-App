
import { auth } from '@clerk/nextjs/server'
import { Show, RedirectToSignIn, UserButton } from '@clerk/nextjs'
import MyButtons from './buttons'
import Welcome from './welcome'

export default async function Page() {
    await auth.protect()
  

  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Show when="signed-in">
          <header className="flex justify-end items-center p-4 gap-4 h-16 bg-blue-500">
            <UserButton />
          </header>
        </Show>
        <Show when="signed-out">
          <RedirectToSignIn />
        </Show>
        <div className = "flex-1 flex justify-center items-center"><Welcome/></div>
        <section className="flex-1 flex justify-center items-center">
          <MyButtons/>
        </section>
      </main>
    </>
  )
}


