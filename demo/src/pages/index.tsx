import { Lora } from 'next/font/google'
import OTP from '@/components/OTP'

const lora = Lora({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center bg-spring-wood-100 space-y-9 ${lora.className}`}
    >
      <div className='text-center'>
        <h1 className='font-semibold text-4xl text-neutral-800'>
          One-Time Password
        </h1>
        <p className='font-medium text-neutral-500 max-w-lg mt-1'>
          OTP component for React. Built with Tailwind. Types included.
        </p>
      </div>

      <OTP onComplete={(otp) => console.log(otp)} />
    </main>
  )
}
