import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'

import LibraryBookList from '../components/library-book-list'

describe('<LibraryBookList />', () => {

  test('Should have a list of books that the user has saved quotes for', async () => {
    render(<LibraryBookList />, { wrapper: BrowserRouter })
    await waitForElementToBeRemoved(screen.getByText("Loading..."))

    const books = screen.getAllByAltText(/Test Book/i)
    expect(books).toHaveLength(2);
  })
})
