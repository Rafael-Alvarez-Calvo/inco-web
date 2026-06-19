import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom'
import { ScrollToTop } from './ScrollToTop'
import userEvent from '@testing-library/user-event'

function TestApp() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<><p>Home</p><Link to="/about">Go About</Link></>} />
        <Route path="/about" element={<p>About</p>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ScrollToTop', () => {
  it('calls window.scrollTo(0,0) on initial render', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo')
    render(<TestApp />)
    expect(scrollTo).toHaveBeenCalledWith(0, 0)
  })

  it('calls window.scrollTo(0,0) again when pathname changes', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo')
    const user = userEvent.setup()
    const { getByText } = render(<TestApp />)
    const callCountBefore = scrollTo.mock.calls.length

    await user.click(getByText('Go About'))
    expect(scrollTo.mock.calls.length).toBeGreaterThan(callCountBefore)
    expect(scrollTo).toHaveBeenLastCalledWith(0, 0)
  })

  it('renders nothing (returns null)', () => {
    const { container } = render(
      <MemoryRouter><ScrollToTop /></MemoryRouter>,
    )
    expect(container.firstChild).toBeNull()
  })
})
