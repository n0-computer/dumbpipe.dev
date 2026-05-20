import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tag } from './Tag';

describe('Tag Component', () => {
  it('renders children correctly', () => {
    const testText = 'Test Tag';
    render(<Tag>{testText}</Tag>);
    
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('uses default variant (medium) and color (irohPurple) when not provided', () => {
    render(<Tag>Test</Tag>);
    
    const tagElement = screen.getByText('Test');
    expect(tagElement).toHaveClass('font-mono', 'text-[0.625rem]', 'font-semibold', 'leading-6');
  });

  it('applies the correct classes for the default medium variant', () => {
    render(<Tag>Test</Tag>);
    
    const tagElement = screen.getByText('Test');
    expect(tagElement).toHaveClass('font-mono', 'text-[0.625rem]', 'font-semibold', 'leading-6');
  });

  it('accepts a custom variant prop', () => {
    render(<Tag variant="medium">Test</Tag>);
    
    const tagElement = screen.getByText('Test');
    expect(tagElement).toHaveClass('font-mono', 'text-[0.625rem]', 'font-semibold', 'leading-6');
  });

  it('accepts a custom color prop', () => {
    render(<Tag color="sky">Test</Tag>);
    
    const tagElement = screen.getByText('Test');
    expect(tagElement).toHaveClass('font-mono', 'text-[0.625rem]', 'font-semibold', 'leading-6');
  });

  it('handles different color values properly', () => {
    const colors = ['irohPurple', 'sky', 'amber', 'rose', 'zinc'];
    
    colors.forEach(color => {
      render(<Tag color={color}>{color}</Tag>);
      expect(screen.getByText(color)).toBeInTheDocument();
    });
  });

  it('renders with different children types', () => {
    // String child
    render(<Tag>String Child</Tag>);
    expect(screen.getByText('String Child')).toBeInTheDocument();

    // Number child
    render(<Tag>{123}</Tag>);
    expect(screen.getByText('123')).toBeInTheDocument();

    // JSX Element child
    render(<Tag><span>JSX Child</span></Tag>);
    expect(screen.getByText('JSX Child')).toBeInTheDocument();
  });

  it('applies the correct base classes consistently', () => {
    render(<Tag variant="medium" color="irohPurple">Test</Tag>);
    
    const tagElement = screen.getByText('Test');
    expect(tagElement).toHaveClass('font-mono');
    expect(tagElement).toHaveClass('text-[0.625rem]');
    expect(tagElement).toHaveClass('font-semibold');
    expect(tagElement).toHaveClass('leading-6');
  });

  it('renders as a span element with proper styling', () => {
    render(<Tag>Sample</Tag>);

    const tagElement = screen.getByText('Sample');
    expect(tagElement.tagName).toBe('SPAN');
  });

  it('handles numeric children properly', () => {
    // Testing with a number as children
    render(<Tag>{123}</Tag>);

    const tagElement = screen.getByText('123');
    expect(tagElement).toBeInTheDocument();
  });
});