import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
      <div className="flex h-[66.66vh] items-center justify-center pt-60">
        <SignUp 
          appearance={{
              variables: {
                colorPrimary: '#BCBEF5',
                colorBackground: '#A0A2E8',
              }
            }
          }
        />
      </div>
    )
}