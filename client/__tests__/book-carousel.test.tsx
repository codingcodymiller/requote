import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import { rest } from 'msw';
import { server } from '../__mocks__/server'

import BookCarousel from '../components/book-carousel'

describe('<BookCarousel />', () => {
  it('Should have a loading element present while data is retrieved', () => {
    render(<BookCarousel />, { wrapper: BrowserRouter })
    expect(screen.getByRole('status')).toBeInTheDocument();
  })
  it('Should load a list of books that the user has saved quotes for', async () => {
    render(<BookCarousel />, { wrapper: BrowserRouter })
    await waitForElementToBeRemoved(screen.getByRole('status'))

    const books = screen.getAllByTitle(/cover/i)
    expect(books).toHaveLength(3); //2 books from dummy data plus "All Books" slide
  })
  it('Should have a slide to show all quotes from all books', async () => {
    render(<BookCarousel />, { wrapper: BrowserRouter })
    await waitForElementToBeRemoved(screen.getByRole('status'))

    const allBooks = screen.getAllByTitle(/all books/i)
    expect(allBooks).toHaveLength(1);
  })
  it('Should not be visible when a user has not saved any quotes for any books yet.', async () => {
    server.use(
      rest.get('/api/books', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.set('Content-Type', 'application/json'),
          ctx.json([])
        );
      })
    )

    render(<BookCarousel />, { wrapper: BrowserRouter })

    waitFor(() => expect(screen.queryByRole('status')).toBeNull())

    expect(screen.queryByRole('button')).toBeNull()
  })
})
