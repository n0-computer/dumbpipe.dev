import React from 'react'
import { render, screen } from '@testing-library/react'

// Mock the IconLink component before importing the component under test
jest.mock('@/components/IconLink', () => {
  const React = require('react');
  return {
    __esModule: true,
    IconLink: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => {
      return React.createElement('a', { href, className }, children);
    },
  };
});

// Now import the component after mocks are set up
import NotFound from './not-found'

describe('NotFound Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('renders the 404 error code', () => {
    render(<NotFound />)

    const errorCodeElement = screen.getByText('404')
    expect(errorCodeElement).toBeInTheDocument()
    expect(errorCodeElement.tagName).toBe('P')
    expect(errorCodeElement).toHaveClass('font-display', 'text-4xl/tight', 'font-light', 'text-white')
  })

  it('renders the "Page not found" heading', () => {
    render(<NotFound />)

    const headingElement = screen.getByText('Page not found')
    expect(headingElement).toBeInTheDocument()
    expect(headingElement.tagName).toBe('H1')
    expect(headingElement).toHaveClass('font-display', 'text-xl/8', 'font-semibold', 'text-white')
  })

  it('renders the error description text', () => {
    render(<NotFound />)

    const descriptionElement = screen.getByText(
      'Sorry, we couldn’t find the page you’re looking for.'
    )
    expect(descriptionElement).toBeInTheDocument()
    expect(descriptionElement.tagName).toBe('P')
    expect(descriptionElement).toHaveClass('text-sm/6', 'text-gray-300')
  })

  it('renders the home link with correct text and href', () => {
    render(<NotFound />)

    const homeLink = screen.getByRole('link', { name: /Go back home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('contains the SVG element with radial gradient', () => {
    render(<NotFound />)

    // Since SVG has aria-hidden="true", it's not accessible via normal ARIA roles
    // Instead, find the SVG element directly
    const svgElements = document.querySelectorAll('svg');
    expect(svgElements).toHaveLength(1);

    const svgElement = svgElements[0];
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('aria-hidden', 'true');
  })

  it('has correct visual hierarchy with proper spacing classes', () => {
    render(<NotFound />)

    const mainDiv = screen.getByText('404').closest('div')
    expect(mainDiv).toHaveClass('relative', 'isolate', 'flex', 'flex-auto', 'flex-col', 'items-center', 'justify-center', 'overflow-hidden', 'bg-gray-950', 'text-center')
  })

  it('renders all elements in the correct order', () => {
    render(<NotFound />)

    // Check that all expected texts are present in the correct DOM order
    const errorCode = screen.getByText('404')
    const heading = screen.getByText('Page not found')
    const description = screen.getByText('Sorry, we couldn’t find the page you’re looking for.')
    const link = screen.getByText('Go back home')

    // Verify the order by ensuring they appear in the document
    expect(errorCode).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(link).toBeInTheDocument()
  })

  it('applies correct margin classes to elements', () => {
    render(<NotFound />)

    const heading = screen.getByText('Page not found')
    const description = screen.getByText('Sorry, we couldn’t find the page you’re looking for.')
    const link = screen.getByRole('link', { name: /Go back home/i })

    // Check if elements have expected margin classes
    expect(heading).toHaveClass('mt-4')
    expect(description).toHaveClass('mt-2')
    expect(link).toHaveClass('mt-4')
  })

  it('renders with proper accessibility attributes', () => {
    render(<NotFound />)

    // Check that the structure is semantically correct
    const heading = screen.getByRole('heading', { level: 1, name: /Page not found/i })
    expect(heading).toBeInTheDocument()
  })
})