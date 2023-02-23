import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import { rest } from 'msw';
import { server } from '../mocks/server'

import LibraryBookList from '../components/library-book-list'

describe('<LibraryBookList />', () => {
  it('Should have a loading element present while data is retrieved', () => {
    render(<LibraryBookList />, { wrapper: BrowserRouter })
    expect(screen.getByRole('status')).toBeInTheDocument();
  })
  it('Should load a list of books that the user has saved quotes for', async () => {
    render(<LibraryBookList />, { wrapper: BrowserRouter })
    await waitForElementToBeRemoved(screen.getByRole('status'))

    const books = screen.getAllByRole('button')
    expect(books).toHaveLength(2);
  })
  it('Should show that there are no books when a user has not saved any quotes for any books yet.', async () => {
    server.use(
      rest.get('/api/books', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.set('Content-Type', 'application/json'),
          ctx.json([])
        );
      })
    )
    render(<LibraryBookList />, { wrapper: BrowserRouter })
    await waitForElementToBeRemoved(screen.getByRole('status'))

    expect(screen.getByText((/no books/i))).toBeInTheDocument();
  })
})
