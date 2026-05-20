import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';

// Mock the next-themes useTheme hook
const mockSetTheme = jest.fn();
const mockResolvedTheme = jest.fn();

// Mock useState to return a setter function and mock the mounting behavior
const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initialState: any) => [true, mockSetState], // Always mounted for these tests
  useEffect: (cb: () => void) => cb(), // Execute the callback immediately during testing
}));

// Mock next-themes properly
jest.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: mockResolvedTheme(),
    setTheme: mockSetTheme,
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockResolvedTheme.mockReturnValue('light');
  });

  it('renders the theme toggle button', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('displays correct screen reader text based on current theme', async () => {
    mockResolvedTheme.mockReturnValue('light');

    render(<ThemeToggle />);

    expect(screen.getByText('Switch to dark theme')).toBeInTheDocument();

    // Test with dark theme
    mockResolvedTheme.mockReturnValue('dark');

    // Re-render to update with new theme value
    render(<ThemeToggle />);

    expect(screen.getByText('Switch to light theme')).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    mockResolvedTheme.mockReturnValue('light');

    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    // Click the button to switch theme
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles theme back when clicked again', () => {
    mockResolvedTheme.mockReturnValue('dark');

    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    // Click the button to switch theme back
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('has correct CSS classes applied', () => {
    mockResolvedTheme.mockReturnValue('light');

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('group', 'absolute', 'right-4', 'top-4', 'z-50', '-m-2.5', 'p-2.5');
  });

  it('renders the theme icon', () => {
    mockResolvedTheme.mockReturnValue('light');

    render(<ThemeToggle />);

    // Check that the SVG element is present (the ThemeIcon)
    const svg = screen.getByText(/Switch to/).nextElementSibling;
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });
});