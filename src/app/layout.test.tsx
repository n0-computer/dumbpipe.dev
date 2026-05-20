import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock CSS modules and static assets
jest.mock('@/styles/tailwind.css', () => ({}))

// Mock font imports
jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
}))

jest.mock('next/font/local', () => () => ({ variable: '--font-mona-sans' }))

// Mock clsx
jest.mock('clsx', () => (...inputs: any[]) => inputs.join(' '))

// Mock Providers component
jest.mock('@/app/providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => <div data-testid="providers">{children}</div>,
}))

// Dynamically import the layout component to allow for mocking
let RootLayout: any;
let metadata: any;

beforeAll(async () => {
  const layoutModule = await import('@/app/layout')
  RootLayout = layoutModule.default
  metadata = layoutModule.metadata
})

describe('RootLayout', () => {
  // Since we can't directly test <html> and <body> tags with React Testing Library,
  // we'll test the content and structure within the Providers wrapper
  it('renders children inside the Providers wrapper', () => {
    render(<RootLayout><div data-testid="child-test">Child Content</div></RootLayout>)

    const providersElement = screen.getByTestId('providers')
    expect(providersElement).toBeInTheDocument()

    const childElement = screen.getByTestId('child-test')
    expect(childElement).toBeInTheDocument()
    expect(childElement).toHaveTextContent('Child Content')
  })

  it('includes the analytics script', () => {
    render(<RootLayout>Test Content</RootLayout>)

    const scriptElement = document.querySelector('script[src="https://plausible.io/js/script.js"]')
    expect(scriptElement).toBeInTheDocument()
    expect(scriptElement).toHaveAttribute('defer')
    expect(scriptElement).toHaveAttribute('data-domain', 'dumbpipe.dev')
  })
})

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Dumb Pipe')
  })

  it('has correct description', () => {
    expect(metadata.description).toBe(
      'Iroh connections are dumb pipes: easy, direct connections that punch through NATs & stay connected as network conditions change.'
    )
  })
})