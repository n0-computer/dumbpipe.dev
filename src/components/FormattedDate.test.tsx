import { render, screen } from '@testing-library/react'
import { FormattedDate } from './FormattedDate'

describe('FormattedDate', () => {
  const mockDate = new Date(2023, 0, 15) // Jan 15, 2023

  beforeEach(() => {
    // Mock the timezone to UTC to ensure consistent tests
    jest.useFakeTimers()
    jest.setSystemTime(mockDate)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders a time element with the correct datetime attribute', () => {
    render(<FormattedDate date={mockDate} />)
    
    const timeElement = screen.getByText('Jan 15, 2023')
    expect(timeElement.tagName).toBe('TIME')
    expect(timeElement.getAttribute('datetime')).toBe('2023-01-15T00:00:00.000Z')
  })

  it('formats date correctly from Date object', () => {
    const date = new Date(2023, 5, 15) // June 15, 2023
    render(<FormattedDate date={date} />)
    
    expect(screen.getByText('Jun 15, 2023')).toBeInTheDocument()
  })

  it('formats date correctly from ISO string', () => {
    const dateString = '2023-07-20T12:30:00Z'
    render(<FormattedDate date={dateString} />)
    
    expect(screen.getByText('Jul 20, 2023')).toBeInTheDocument()
  })

  it('formats date correctly from different date string formats', () => {
    const dateString = '2023-03-10'
    render(<FormattedDate date={dateString} />)
    
    expect(screen.getByText('Mar 10, 2023')).toBeInTheDocument()
  })

  it('includes additional props passed to the component', () => {
    render(
      <FormattedDate 
        date={mockDate} 
        className="custom-class"
        data-testid="formatted-date"
      />
    )
    
    const timeElement = screen.getByTestId('formatted-date')
    expect(timeElement).toHaveClass('custom-class')
  })

  it('generates correct ISO string for datetime attribute with various dates', () => {
    const datesAndExpected = [
      [new Date(2022, 11, 31), 'Dec 31, 2022'],
      [new Date(2023, 0, 1), 'Jan 1, 2023'],
      [new Date(2023, 11, 25), 'Dec 25, 2023']
    ]
    
    datesAndExpected.forEach(([date, expected]) => {
      render(<FormattedDate date={date as Date} />)
      expect(screen.getByText(expected as string)).toBeInTheDocument()
      expect(screen.getByText(expected as string).tagName).toBe('TIME')
      expect(screen.getByText(expected as string).getAttribute('datetime'))
        .toBe((date as Date).toISOString())
    })
  })

  it('handles date conversion properly from string inputs', () => {
    const dateString = '2023-09-08T15:30:00Z'
    const expectedISOString = new Date(dateString).toISOString()

    render(<FormattedDate date={dateString} />)

    const timeElement = screen.getByText('Sep 8, 2023')
    expect(timeElement.getAttribute('datetime')).toBe(expectedISOString)
  })

  it('correctly formats months with different numbers of days', () => {
    const februaryDate = '2023-02-28T00:00:00Z' // February with 28 days
    const leapYearFebruary = '2020-02-29T00:00:00Z' // Leap year February
    
    render(<FormattedDate date={februaryDate} />)
    expect(screen.getByText('Feb 28, 2023')).toBeInTheDocument()
    
    render(<FormattedDate date={leapYearFebruary} />)
    expect(screen.getByText('Feb 29, 2020')).toBeInTheDocument()
  })

  it('maintains consistent formatting regardless of input type', () => {
    const dateString = '2023-12-25T00:00:00Z'
    const dateObject = new Date(Date.UTC(2023, 11, 25))
    
    const { rerender } = render(<FormattedDate date={dateString} />)
    const formattedFromStr = screen.getByText('Dec 25, 2023')
    
    rerender(<FormattedDate date={dateObject} />)
    const formattedFromObj = screen.getByText('Dec 25, 2023')
    
    expect(formattedFromStr.textContent).toBe(formattedFromObj.textContent)
  })

  it('displays correct abbreviations for all months', () => {
    const months = [
      [0, 'Jan'], [1, 'Feb'], [2, 'Mar'], [3, 'Apr'], 
      [4, 'May'], [5, 'Jun'], [6, 'Jul'], [7, 'Aug'], 
      [8, 'Sep'], [9, 'Oct'], [10, 'Nov'], [11, 'Dec']
    ]
    
    months.forEach(([monthIndex, monthAbbr]) => {
      const date = new Date(2023, monthIndex as number, 15)
      const { unmount } = render(<FormattedDate date={date} />)
      
      expect(screen.getByText(`${monthAbbr} 15, 2023`)).toBeInTheDocument()
      unmount() // Clean up between renders
    })
  })
})