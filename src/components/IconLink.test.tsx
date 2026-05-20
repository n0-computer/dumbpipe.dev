import React from 'react';
import { render, screen } from '@testing-library/react';
import { IconLink } from './IconLink';

// Mock the Next.js Link component
jest.mock('next/link', () => {
  const MockLink = (props: any) => {
    const { children, href = '#' } = props;
    const linkProps = { ...props, href }; // Copy all props but override href
    delete linkProps.children; // Don't spread children

    return (
      <a {...linkProps}>
        {children}
      </a>
    );
  };

  return {
    __esModule: true,
    default: MockLink,
  };
});

const TestIcon = ({ className }: { className?: string }) => <svg data-testid="test-icon" className={className}>Test Icon</svg>;

describe('IconLink', () => {
  it('renders children correctly', () => {
    render(<IconLink href="/test">Test Link</IconLink>);
    
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(<IconLink href="/test">Test Link</IconLink>);
    
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveClass('flex', 'items-center', 'rounded-lg', 'px-2', 'py-0.5');
  });

  it('renders icon when provided', () => {
    render(<IconLink href="/test" icon={TestIcon}>Test Link</IconLink>);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('does not render icon when not provided', () => {
    render(<IconLink href="/test">Test Link</IconLink>);
    
    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
  });

  it('applies compact classes when compact prop is true', () => {
    render(<IconLink href="/test" compact={true}>Test Link</IconLink>);
    
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveClass('gap-x-2');
  });

  it('applies default spacing when compact prop is false', () => {
    render(<IconLink href="/test" compact={false}>Test Link</IconLink>);
    
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveClass('gap-x-3');
  });

  it('applies large icon classes when large prop is true', () => {
    render(<IconLink href="/test" icon={TestIcon} large={true}>Test Link</IconLink>);

    const iconElement = screen.getByTestId('test-icon');
    expect(iconElement).toHaveAttribute('class', expect.stringContaining('h-6'));
    expect(iconElement).toHaveAttribute('class', expect.stringContaining('w-6'));
  });

  it('applies default icon classes when large prop is false', () => {
    render(<IconLink href="/test" icon={TestIcon} large={false}>Test Link</IconLink>);

    const iconElement = screen.getByTestId('test-icon');
    expect(iconElement).toHaveAttribute('class', expect.stringContaining('h-4'));
    expect(iconElement).toHaveAttribute('class', expect.stringContaining('w-4'));
  });

  it('forwards additional props to the Link component', () => {
    render(<IconLink href="/test" title="Test Title" data-testid="icon-link">Test Link</IconLink>);
    
    const linkElement = screen.getByTestId('icon-link');
    expect(linkElement).toHaveAttribute('title', 'Test Title');
    expect(linkElement).toHaveAttribute('href', '/test');
  });

  it('applies custom className when provided', () => {
    render(<IconLink href="/test" className="custom-class">Test Link</IconLink>);
    
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveClass('custom-class');
  });

  it('contains the background span element', () => {
    render(<IconLink href="/test">Test Link</IconLink>);
    
    const backgroundSpan = screen.getByRole('link').firstChild;
    expect(backgroundSpan).toHaveClass('absolute', 'inset-0', '-z-10', 'scale-75');
  });

  it('contains the text span element with correct class', () => {
    render(<IconLink href="/test">Test Link</IconLink>);

    const textSpan = screen.getByText('Test Link');
    expect(textSpan).toHaveClass('self-baseline', 'text-gray-500');
  });
});