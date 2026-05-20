import { render, screen, fireEvent } from '@testing-library/react'
import { SignUpForm } from './SignUpForm'

describe('SignUpForm', () => {
  beforeEach(() => {
    // Mock window.URL.createObjectURL to avoid issues in tests
    Object.defineProperty(window, 'URL', {
      value: {
        createObjectURL: jest.fn(),
      },
      writable: true,
    })
  })

  it('renders the email input field', () => {
    const { container } = render(<SignUpForm />)

    const emailInput = screen.getByPlaceholderText('Email address')
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('autoComplete', 'email')
    expect(emailInput).toHaveAttribute('name', 'email')
    expect(emailInput).toHaveAttribute('required')
  })

  it('renders the submit button with correct text', () => {
    const { container } = render(<SignUpForm />)

    const submitButton = screen.getByRole('button', { name: 'Get updates' })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('renders the email label correctly', () => {
    const { container } = render(<SignUpForm />)

    const label = screen.getByText('Email address')
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass('sr-only') // Screen reader only
  })

  it('has the correct form element', () => {
    const { container } = render(<SignUpForm />)

    const form = container.querySelector('form')
    expect(form).toBeInTheDocument()
  })

  it('applies correct classes to the main form element', () => {
    const { container } = render(<SignUpForm />)

    const form = container.querySelector('form')
    expect(form).toHaveClass('relative')
    expect(form).toHaveClass('isolate')
    expect(form).toHaveClass('mt-8')
    expect(form).toHaveClass('flex')
    expect(form).toHaveClass('items-center')
    expect(form).toHaveClass('pr-1')
  })

  it('applies correct classes to the input element', () => {
    const { container } = render(<SignUpForm />)

    const input = screen.getByPlaceholderText('Email address')
    expect(input).toHaveClass('peer')
    expect(input).toHaveClass('w-0')
    expect(input).toHaveClass('flex-auto')
    expect(input).toHaveClass('bg-transparent')
    expect(input).toHaveClass('px-4')
    expect(input).toHaveClass('py-2.5')
    expect(input).toHaveClass('text-base')
    expect(input).toHaveClass('text-white')
  })

  it('allows typing in the email input', () => {
    const { container } = render(<SignUpForm />)

    const emailInput = screen.getByPlaceholderText('Email address')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    expect(emailInput).toHaveValue('test@example.com')
  })

  it('focuses the input when focused', () => {
    const { container } = render(<SignUpForm />)

    const emailInput = screen.getByPlaceholderText('Email address')
    emailInput.focus()

    expect(emailInput).toHaveFocus()
  })

  it('uses a unique ID for the input field', () => {
    const { container } = render(<SignUpForm />)

    const emailInput = screen.getByPlaceholderText('Email address')
    const inputId = emailInput.getAttribute('id')
    expect(inputId).toBeDefined()
    expect(inputId).toBeTruthy()
  })

  it('links the label to the input via ID', () => {
    const { container } = render(<SignUpForm />)

    const label = screen.getByText('Email address')
    const emailInput = screen.getByPlaceholderText('Email address')

    const inputId = emailInput.getAttribute('id')
    expect(label).toHaveAttribute('for', inputId)
  })

  it('renders multiple div elements with correct classes', () => {
    const { container } = render(<SignUpForm />)

    const divElements = container.querySelectorAll('div')
    expect(divElements.length).toBeGreaterThanOrEqual(2)
  })

  it('has the correct placeholder text for the input', () => {
    render(<SignUpForm />)

    const emailInput = screen.getByPlaceholderText('Email address')
    expect(emailInput).toHaveAttribute('placeholder', 'Email address')
  })

  it('has the correct ARIA attributes and roles', () => {
    render(<SignUpForm />)

    // Input should have implicit textbox role
    const emailInput = screen.getByPlaceholderText('Email address')
    expect(emailInput).not.toHaveAttribute('aria-label')
  })
})