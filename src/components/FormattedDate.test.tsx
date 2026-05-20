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

})