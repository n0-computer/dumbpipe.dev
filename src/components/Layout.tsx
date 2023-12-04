import { useId } from 'react'

import { Intro, IntroFooter } from '@/components/Intro'
import { ThemeToggle } from '@/components/ThemeToggle'

function FixedSidebar({
  main,
  footer,
}: {
  main: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <div className="relative flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0">
      <div className="relative flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+48rem)] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:pl-[max(4rem,calc(50%-40rem))] bg-white">
        <div className="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
          <div className="pb-16 pt-16 px-6 sm:px-0 sm:pb-20 sm:pt-32 lg:py-10">
            <div className="relative">
              {main}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-center pb-4 lg:justify-start lg:pb-6">
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FixedSidebar main={<Intro />} footer={<IntroFooter />} />
      <ThemeToggle />
      <div className="relative flex-auto">
        <main className="space-y-20 py-20 sm:space-y-32 sm:py-32 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </>
  )
}
