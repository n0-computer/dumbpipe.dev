import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  // Test that the button renders correctly with default props
  it('renders as a button element when no href is provided', () => {
    render(<Button>Click Me</Button>);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toBe('BUTTON');
  });

  // Test that the button renders as a link when href is provided
  it('renders as a link element when href is provided', () => {
    render(<Button href="/test-page">Link Me</Button>);
    
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    expect(linkElement.getAttribute('href')).toBe('/test-page');
  });

  // Test that the button renders children properly
  it('renders children correctly', () => {
    render(<Button>Test Button Content</Button>);
    
    expect(screen.getByText('Test Button Content')).toBeInTheDocument();
  });

  // Test that the arrow prop adds the arrow character
  it('renders with arrow when arrow prop is true', () => {
    render(<Button arrow={true}>Arrow Button</Button>);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.textContent).toContain('Arrow Button');
    expect(buttonElement.textContent).toContain('\u2192'); // right arrow character
  });

  // Test that the arrow prop is not present when false
  it('does not render arrow when arrow prop is false', () => {
    render(<Button arrow={false}>No Arrow Button</Button>);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.textContent).toContain('No Arrow Button');
    expect(buttonElement.textContent).not.toContain('\u2192'); // no right arrow character
  });

  // Test that additional props are passed through
  it('passes additional props to the button element', () => {
    render(<Button onClick={jest.fn()} data-testid="test-button">Test</Button>);
    
    const buttonElement = screen.getByTestId('test-button');
    expect(buttonElement).toBeInTheDocument();
  });

  // Test that additional props are passed through to link as well
  it('passes additional props to the link element', () => {
    render(<Button href="/another-page" data-testid="test-link">Test</Button>);
    
    const linkElement = screen.getByTestId('test-link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('/another-page');
  });

  // Test custom class names are applied
  it('applies custom className when provided', () => {
    const customClass = 'custom-class-name';
    render(<Button className={customClass}>Custom Class Button</Button>);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass(customClass);
  });

  // Test default styling classes are applied
  it('applies default styling classes', () => {
    render(<Button>Styled Button</Button>);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('group');
    expect(buttonElement).toHaveClass('relative');
    expect(buttonElement).toHaveClass('isolate');
    expect(buttonElement).toHaveClass('flex-none');
    expect(buttonElement).toHaveClass('rounded-md');
    expect(buttonElement).toHaveClass('py-1.5');
    expect(buttonElement).toHaveClass('text-[0.8125rem]/6');
    expect(buttonElement).toHaveClass('font-semibold');
    expect(buttonElement).toHaveClass('text-white');
  });

  // Test arrow-specific styling is applied when arrow prop is true
  it('applies arrow-specific padding when arrow prop is true', () => {
    render(<Button arrow={true}>Arrow Button</Button>);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('pl-2.5');
  });

  // Test non-arrow padding when arrow prop is false
  it('applies non-arrow padding when arrow prop is false', () => {
    render(<Button arrow={false}>No Arrow Button</Button>);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('px-2.5');
  });
});