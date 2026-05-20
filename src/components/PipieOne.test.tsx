import React from 'react';
import { render, screen } from '@testing-library/react';
import PipieOne from './PipieOne';

describe('PipieOne', () => {
  it('should render without crashing', () => {
    const { container } = render(<PipieOne />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should render an SVG element with correct attributes', () => {
    const { container } = render(<PipieOne />);
    const svgElement = container.querySelector('svg');

    // Check that it has the correct xmlns attribute
    expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
    // Check that it has the correct viewBox attribute
    expect(svgElement).toHaveAttribute('viewBox', '0 0 400 400');
  });

  it('should render the correct number of path elements', () => {
    const { container } = render(<PipieOne />);
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(15); // Counted paths in the component (15 paths)
  });

  it('should render ellipse elements', () => {
    const { container } = render(<PipieOne />);
    const ellipses = container.querySelectorAll('ellipse');
    expect(ellipses).toHaveLength(3);
  });

  it('should render g (group) elements', () => {
    const { container } = render(<PipieOne />);
    const groups = container.querySelectorAll('g');
    expect(groups).toHaveLength(1);
  });
});