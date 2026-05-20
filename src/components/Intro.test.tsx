import React from 'react';
import { render, screen } from '@testing-library/react';
import { Intro, IntroFooter } from './Intro';

// Mock the child components that are imported
jest.mock('./PipieOne', () => ({
  __esModule: true,
  default: () => <div data-testid="pipie-one" />,
}));

jest.mock('@/components/IconLink', () => {
  const IconLinkMock = (props: { children: React.ReactNode; href: string; icon: React.FC<any>; [key: string]: any }) => {
    // Access props directly without destructuring
    const children = props.children;
    const href = props.href;
    const Icon = props.icon;

    // Extract remaining props by copying them
    const otherProps: Record<string, any> = {};
    for (const key in props) {
      if (key !== 'children' && key !== 'href' && key !== 'icon') {
        otherProps[key] = props[key];
      }
    }
    return (
      <a href={href} {...otherProps}>
        {Icon && <Icon />}
        {children}
      </a>
    );
  };
  return {
    __esModule: true,
    IconLink: IconLinkMock,
  };
});

describe('Intro Component', () => {
  beforeEach(() => {
    // Clear any previous mock implementations
    jest.clearAllMocks();
  });

  it('renders the PipieOne logo inside a link to home', () => {
    render(<Intro />);

    // Get the home link (only the one with the PipieOne component)
    const homeLink = screen.getByRole('link', { name: '' }); // The home link has no text content
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const pipieOneElement = screen.getByTestId('pipie-one');
    expect(pipieOneElement).toBeInTheDocument();
  });

  it('renders the main heading with correct text', () => {
    render(<Intro />);
    
    // Check for the "Need to connect two devices?" text
    expect(screen.getByText(/Need to connect two devices\?/)).toBeInTheDocument();
    
    // Check for the "Try a" text
    expect(screen.getByText(/Try a/)).toBeInTheDocument();
    
    // Check for "dumb pipe" text with specific styling
    const dumbPipeElement = screen.getByText('dumb pipe');
    expect(dumbPipeElement).toBeInTheDocument();
    expect(dumbPipeElement).toHaveClass('text-gray-950');
  });

  it('renders the large title with correct classes', () => {
    render(<Intro />);
    
    const largeTitle = screen.getByText('dumb pipe');
    expect(largeTitle).toBeInTheDocument();
    
    // Find the parent element that contains the large title styling
    const titleElement = screen.getByText(/dumb pipe/);
    expect(titleElement.closest('h1')).toHaveClass('font-title', 'text-7xl/tight', 'md:text-8xl', 'font-light', 'text-gray-500');
  });

  it('renders the description paragraph', () => {
    render(<Intro />);
    
    const description = screen.getByText(
      'Easy, direct connections that punch through NATs & stay connected as network conditions change.'
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm/6', 'text-gray-500');
  });

  it('renders all IconLink buttons with correct attributes', () => {
    render(<Intro />);
    
    // Check for Docs link
    const docsLink = screen.getByRole('link', { name: /Docs/ });
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute('href', 'https://www.iroh.computer/docs');
    
    // Check for GitHub link
    const githubLink = screen.getByRole('link', { name: /GitHub/ });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/n0-computer/dumbpipe');
    
    // Check for Discord link
    const discordLink = screen.getByRole('link', { name: /Discord/ });
    expect(discordLink).toBeInTheDocument();
    expect(discordLink).toHaveAttribute('href', 'https://iroh.computer/discord');
  });

  it('applies the correct flex wrapper class around the IconLinks', () => {
    render(<Intro />);

    // Find the flex wrapper div that contains the IconLinks by searching for the specific classes
    const flexWrapper = document.querySelector('div.mt-8.flex.flex-wrap.justify-center');
    expect(flexWrapper).toBeInTheDocument();
    expect(flexWrapper).toHaveClass('flex', 'flex-wrap', 'justify-center', 'gap-x-1', 'gap-y-3', 'sm:gap-x-2', 'lg:justify-start');
  });

  it('renders the correct number of IconLink components', () => {
    render(<Intro />);
    
    const iconLinks = screen.getAllByRole('link');
    // There are 3 icon links: Docs, GitHub, Discord
    expect(iconLinks.length).toBeGreaterThanOrEqual(3); // At least 3 links
  });

  it('renders with correct layout classes on container elements', () => {
    render(<Intro />);

    // Check for the main container with image size by using the specific class combination
    const containerDiv = document.querySelector('div.w-64.h-64');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv).toHaveClass('w-64', 'h-64');

    // Check for the margin top on the first title
    const firstTitle = screen.getByText(/Need to connect two devices\? Try a/);
    expect(firstTitle).toHaveClass('mt-14', 'font-title', 'text-lg/tight', 'md:text-2xl', 'font-light', 'text-gray-500');
  });
});

describe('IntroFooter Component', () => {
  it('renders the footer with correct text', () => {
    render(<IntroFooter />);
    
    expect(screen.getByText(/Made by/)).toBeInTheDocument();
    expect(screen.getByText('number 0')).toBeInTheDocument();
  });

  it('renders the Twitter icon link with correct attributes', () => {
    render(<IntroFooter />);
    
    const twitterLink = screen.getByRole('link', { name: /number 0/ });
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/n0computer');
  });

  it('applies correct classes to the footer paragraph', () => {
    render(<IntroFooter />);
    
    const footerParagraph = screen.getByText(/Made by/).closest('p');
    expect(footerParagraph).toHaveClass('flex', 'items-baseline', 'gap-x-2', 'text-[0.8125rem]/6', 'text-gray-500');
  });
});