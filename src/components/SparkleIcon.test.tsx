import React from 'react';
import { render, screen } from '@testing-library/react';
import { SparkleIcon } from './SparkleIcon';

describe('SparkleIcon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<SparkleIcon />);

    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.tagName).toBe('svg');
  });

  it('has the correct viewBox attribute', () => {
    const { container } = render(<SparkleIcon />);

    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 16 16');
  });

  it('has aria-hidden attribute set to true', () => {
    const { container } = render(<SparkleIcon />);

    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('contains two path elements', () => {
    const { container } = render(<SparkleIcon />);

    const svgElement = container.querySelector('svg');
    const pathElements = svgElement?.querySelectorAll('path');
    expect(pathElements?.length).toBe(2);
  });

  it('has paths with correct fill colors', () => {
    const { container } = render(<SparkleIcon />);

    const svgElement = container.querySelector('svg');
    const paths = svgElement?.querySelectorAll('path');

    expect(paths?.[0]).toHaveAttribute('fill', '#38BDF8');
    expect(paths?.[1]).toHaveAttribute('fill', '#7DD3FC');
  });

  it('applies additional props correctly', () => {
    const customClass = 'custom-class';
    const testDataId = 'sparkle-icon-test';

    const { container } = render(
      <SparkleIcon
        className={customClass}
        data-testid={testDataId}
      />
    );

    const svgElement = screen.getByTestId(testDataId);
    expect(svgElement).toHaveClass(customClass);
  });

  it('forwards other SVG attributes', () => {
    const { container } = render(
      <SparkleIcon
        width="24"
        height="24"
      />
    );

    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '24');
    expect(svgElement).toHaveAttribute('height', '24');
  });
});