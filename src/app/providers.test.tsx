import React from 'react'
import { render, screen } from '@testing-library/react'
import { Providers } from './providers'

// Mock next-themes to prevent issues with JSDOM
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
}))

describe('Providers', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Child Content'
    
    render(
      <Providers>
        <span>{testContent}</span>
      </Providers>
    )

    expect(screen.getByText(testContent)).toBeInTheDocument()
  })

  it('wraps children with ThemeProvider', () => {
    render(
      <Providers>
        <div>Child content</div>
      </Providers>
    )

    // Check if the ThemeProvider mock is rendered
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument()
  })

  it('passes through nested children properly', () => {
    const nestedContent = 'Nested Content'
    
    render(
      <Providers>
        <div>
          <h1>Header</h1>
          <p>{nestedContent}</p>
          <span>Footer</span>
        </div>
      </Providers>
    )

    expect(screen.getByRole('heading', { name: /header/i })).toBeInTheDocument()
    expect(screen.getByText(nestedContent)).toBeInTheDocument()
    expect(screen.getByText(/footer/i)).toBeInTheDocument()
  })

  it('handles multiple children correctly', () => {
    render(
      <Providers>
        <div data-testid="child-1">First child</div>
        <div data-testid="child-2">Second child</div>
        <div data-testid="child-3">Third child</div>
      </Providers>
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
    expect(screen.getByTestId('child-3')).toBeInTheDocument()
  })
})