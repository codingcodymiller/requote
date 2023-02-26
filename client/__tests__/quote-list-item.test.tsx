import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import QuoteListItem from '../components/quote-list-item'

// mocking React Transition Group to make transitions happen instantly.
jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children)
  const FakeCSSTransition = jest.fn(props =>
    props.in ? <FakeTransition>{props.children}</FakeTransition> : null,
  )
  return { CSSTransition: FakeCSSTransition, Transition: FakeTransition }
})

const quote = {
  page: 1,
  quoteText: 'Test quote',
  isPrivate: false,
  quoteId: '2834wdqw2',
  bookTitle: 'Test Tome',
  bookAuthors: ['codingcodymiller'],
  bookISBN: '131-23-123124',
  bookDescription: "It's got tests."
}

describe('<QuoteListItem />', () => {
  it('Should show the Cancel and Confirm icons if the Delete icon is clicked.', () => {
    render(<QuoteListItem quote={quote} />, { wrapper: BrowserRouter })
    fireEvent.click(screen.getByTitle('delete'));
    expect(screen.getByTitle('cancel')).toBeVisible()
    expect(screen.getByTitle('confirm')).toBeVisible()
  })
  it('Should hide the Cancel and Confirm icons if the Delete icon is clicked while Cancel and Confirm are visible.', () => {
    render(<QuoteListItem quote={quote} />, { wrapper: BrowserRouter })
    const deleteIcon = screen.getByTitle('delete')
    fireEvent.click(deleteIcon);
    fireEvent.click(deleteIcon);
    expect(screen.queryByTitle('cancel')).toBeNull()
    expect(screen.queryByTitle('confirm')).toBeNull()
  })
  it('Should hide the Cancel and Confirm icons if the Cancel icon is clicked while Cancel and Confirm are visible.', () => {
    render(<QuoteListItem quote={quote} />, { wrapper: BrowserRouter })
    fireEvent.click(screen.getByTitle('delete'));
    fireEvent.click(screen.getByTitle('cancel'));
    expect(screen.queryByTitle('cancel')).toBeNull()
    expect(screen.queryByTitle('confirm')).toBeNull()
  })
  it('Should show the user if a quote is public.', () => {
    render(<QuoteListItem quote={quote} />, { wrapper: BrowserRouter })
    expect(screen.queryByText(/public/i)).not.toBeNull()
  })
  it('Should show the user if a quote is private.', () => {
    render(<QuoteListItem quote={{ ...quote, isPrivate: true }} />, { wrapper: BrowserRouter })
    expect(screen.queryByText(/private/i)).not.toBeNull()
  })
  it('Should show the quoted text.', () => {
    render(<QuoteListItem quote={quote} />, { wrapper: BrowserRouter })
    expect(screen.queryByText(quote.quoteText)).toBeVisible()
  })
})
