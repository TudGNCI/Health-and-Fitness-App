import { auth } from '@clerk/nextjs/server'

export default async function Page() {
  await auth.protect()

}
