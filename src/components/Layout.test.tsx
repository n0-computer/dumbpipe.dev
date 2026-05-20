import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock the imported components since we're testing Layout in isolation
jest.mock('@/components/Intro', () => ({
  Intro: () => <div data-testid="intro">Intro Component</div>,
  IntroFooter: () => <div data-testid="intro-footer">Intro Footer</div>,
}))

jest.mock('@/components/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme Toggle</button>,
}))

import { Layout } from './Layout'

describe('Layout', () => {
  it('renders children inside the main element', () => {
    const testChildren = <div data-testid="test-child">Test Child Content</div>
    
    render(<Layout>{testChildren}</Layout>)
    
    // Check that children are rendered inside the main element
    const mainElement = screen.getByRole('main')
    const childElement = screen.getByTestId('test-child')
    
    expect(mainElement).toBeInTheDocument()
    expect(childElement).toBeInTheDocument()
    expect(mainElement).toContainElement(childElement)
  })

  it('renders FixedSidebar with Intro and IntroFooter components', () => {
    render(<Layout>Test Children</Layout>)
    
    // Check that Intro and IntroFooter components are present in the sidebar
    const introElement = screen.getByTestId('intro')
    const introFooterElement = screen.getByTestId('intro-footer')
    
    expect(introElement).toBeInTheDocument()
    expect(introFooterElement).toBeInTheDocument()
    expect(introElement).toHaveTextContent('Intro Component')
    expect(introFooterElement).toHaveTextContent('Intro Footer')
  })

  it('renders ThemeToggle component', () => {
    render(<Layout>Test Children</Layout>)
    
    const themeToggleElement = screen.getByTestId('theme-toggle')
    
    expect(themeToggleElement).toBeInTheDocument()
    expect(themeToggleElement).toHaveTextContent('Theme Toggle')
  })

  it('applies correct CSS classes to main container', () => {
    const testChildren = <div>Test Content</div>
    
    render(<Layout>{testChildren}</Layout>)
    
    const mainElement = screen.getByRole('main')
    
    expect(mainElement).toHaveClass('space-y-20', 'py-20', 'sm:space-y-32', 'sm:py-32', 'dark:bg-gray-950')
  })

  it('renders multiple children correctly', () => {
    const testChildren = (
      <>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </>
    )
    
    render(<Layout>{testChildren}</Layout>)
    
    const child1 = screen.getByTestId('child-1')
    const child2 = screen.getByTestId('child-2')
    
    expect(child1).toBeInTheDocument()
    expect(child2).toBeInTheDocument()
    expect(child1).toHaveTextContent('Child 1')
    expect(child2).toHaveTextContent('Child 2')
  })

  it('renders empty children without errors', () => {
    render(<Layout>{null}</Layout>)
    
    const mainElement = screen.getByRole('main')
    // Should render without errors even with null children
    expect(mainElement).toBeInTheDocument()
  })
})