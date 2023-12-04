import { useId } from 'react'

import { Intro, IntroFooter } from '@/components/Intro'
import { ThemeToggle } from '@/components/ThemeToggle'

function Pipeline() {
  let id = useId()

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-visible">
      <svg
        className="absolute left-[max(0px,calc(50%-18.125rem))] top-0 h-full w-1 lg:left-full lg:ml-2 xl:left-auto xl:right-0.5 xl:ml-0"
        aria-hidden="true"
      >
        <defs>
          <pattern id={id} width="6" height="8" patternUnits="userSpaceOnUse">
            <path
              d="M0 0H6M0 8H6"
              className="fill-sky-900/10 dark:fill-white/10 xl:fill-white/10"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" className="fill-gray-950/10 xl:fill-gray/10 dark:fill-white/20" />
      </svg>
    </div>
  )
}

function FixedSidebar({
  main,
  footer,
}: {
  main: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <div className="relative flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0">
      <div className="relative flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:pl-[max(4rem,calc(50%-38rem))] bg-white">
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
        <Pipeline />
        <main className="space-y-20 py-20 sm:space-y-32 sm:py-32 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </>
  )
}
