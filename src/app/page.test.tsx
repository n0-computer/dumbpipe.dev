import { render, screen } from '@testing-library/react';
import Home from './page';

// Mock ResizeObserver for JSDOM environment
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

// Mock child components that are used in the Home component
jest.mock('@/components/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>,
}));

jest.mock('@/components/FormattedDate', () => ({
  FormattedDate: ({ date, className }: { date: string | Date; className?: string }) => (
    <time dateTime={new Date(date).toISOString()} className={className}>
      {new Date(date).toLocaleDateString()}
    </time>
  ),
}));

jest.mock('@/components/Code', () => {
  return {
    __esModule: true,
    default: ({ children, language }: { children: React.ReactNode; language?: string }) => (
      <code data-language={language}>{children}</code>
    ),
  };
});

jest.mock('@/components/Button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

describe('Home', () => {
  it('renders layout wrapper', () => {
    render(<Home />);
    const layoutElement = screen.getByTestId('layout');
    expect(layoutElement).toBeInTheDocument();
  });

  it('renders all article sections', () => {
    render(<Home />);

    // Check for presence of all major article headings
    expect(screen.getByText('Connect A to B. Send Data.')).toBeInTheDocument();
    expect(screen.getByText('A unix pipe between computers')).toBeInTheDocument();
    expect(screen.getByText('Put a dumb pipe in your app')).toBeInTheDocument();
    expect(screen.getByText('QUIC & Dumb')).toBeInTheDocument();
    expect(screen.getByText('Sometimes you gotta relay')).toBeInTheDocument();
    expect(screen.getByText('Your own Network')).toBeInTheDocument();
    expect(screen.getByText('Need more?')).toBeInTheDocument();
  });

  it('renders installation instructions', () => {
    render(<Home />);

    // Check for bash installation command
    expect(screen.getByText('$ curl -sL https://www.dumbpipe.dev/install.sh | sh')).toBeInTheDocument();

    // Check for PowerShell installation command
    expect(screen.getByText('$ iwr https://www.dumbpipe.dev/install.ps1 -useb | iex')).toBeInTheDocument();

    // Check for Cargo and Homebrew installation options
    expect(screen.getByText('cargo install dumbpipe')).toBeInTheDocument();
    expect(screen.getByText('brew install dumbpipe')).toBeInTheDocument();
  });

  it('renders example commands for receiver and sender', () => {
    render(<Home />);

    expect(screen.getByText(/using secret key/i)).toBeInTheDocument();
    // Rather than checking for the full identifier, just check for a unique part of it
    expect(screen.getByText(/secret key 23ryys7pgvjrr57pcrvyivdrhvqyykg2tv3leou5grm66xfd7zzq/i)).toBeInTheDocument();
  });

  it('renders Iroh connections section with links', () => {
    render(<Home />);

    expect(screen.getByText('Put a dumb pipe in your app')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /200-line wrapper/i })).toBeInTheDocument();

    // Find the iroh link in the Iroh section specifically
    const irohHeading = screen.getByText('Put a dumb pipe in your app');
    const irohSection = irohHeading.closest('article');
    if (!irohSection) {
      throw new Error('Could not find iroh section');
    }
    const irohLinks = irohSection.querySelectorAll('a[href="https://crates.io/crates/iroh"]');
    expect(irohLinks.length).toBeGreaterThan(0);

    const button = screen.getByRole('button', { name: 'Iroh Endpoint Docs' });
    expect(button).toBeInTheDocument();
  });

  it('renders image correctly', () => {
    render(<Home />);

    const image = screen.getByAltText(''); // Using alt text even though it's empty
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/connect_2_computers.png');
  });

  it('renders relay and premium relay sections', () => {
    render(<Home />);

    expect(screen.getByText('Sometimes you gotta relay')).toBeInTheDocument();
    expect(screen.getByText('Your own Network')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'relay docs' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'n0des' })).toBeInTheDocument();
  });

  it('renders all internal anchor IDs correctly', () => {
    render(<Home />);

    // Check that elements with IDs exist using the getByTestId query
    const connectElement = screen.getByText('Connect A to B. Send Data.');
    expect(connectElement.closest('article')).toHaveAttribute('id', 'connect');

    const downloadElement = screen.getByText('A unix pipe between computers');
    expect(downloadElement.closest('article')).toHaveAttribute('id', 'download');

    const irohElement = screen.getByText('Put a dumb pipe in your app');
    expect(irohElement.closest('article')).toHaveAttribute('id', 'iroh');

    const relayElement = screen.getByText('Sometimes you gotta relay');
    expect(relayElement.closest('article')).toHaveAttribute('id', 'relay');

    const premiumRelaysElement = screen.getByText('Your own Network');
    expect(premiumRelaysElement.closest('article')).toHaveAttribute('id', 'premium-relays');

    const needMoreElement = screen.getByText('Need more?');
    expect(needMoreElement.closest('article')).toHaveAttribute('id', 'need-more');
  });

  it('renders external links correctly', () => {
    render(<Home />);

    expect(screen.getByRole('link', { name: 'Cargo' })).toHaveAttribute('href', 'https://doc.rust-lang.org/stable/cargo/');
    expect(screen.getByRole('link', { name: 'Homebrew' })).toHaveAttribute('href', 'https://brew.sh');
    expect(screen.getByRole('link', { name: 'Iroh Endpoint Docs' })).toHaveAttribute('href', 'https://iroh.computer/docs/concepts/endpoint');
    expect(screen.getByRole('link', { name: 'relay docs' })).toHaveAttribute('href', 'https://iroh.computer/docs/concepts/relay');
    expect(screen.getByRole('link', { name: 'n0des' })).toHaveAttribute('href', 'https://n0des.iroh.computer');

    // Check for iroh link with specific href to distinguish from multiple iroh references
    const irohLinks = screen.getAllByRole('link', { name: 'iroh' });
    const protoLink = Array.from(irohLinks).find(link => link.getAttribute('href') === 'https://iroh.computer/proto');
    expect(protoLink).toBeInTheDocument();
  });
});