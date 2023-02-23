import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import { rest } from 'msw';
import { server } from '../mocks/server'

import BookCover from '../components/book-cover'

const book = {
  isbn: '1231-12-23455',
  title: 'Test Book',
  image: '/images/all-books-graphic.jpg',
  authors: ['codingcodymiller'],
  description: 'Testaroonie'
}

describe('<BookCover />', () => {
  it('Should have a loading element present while the book cover image is loading.', () => {
    render(<BookCover book={book} />, { wrapper: BrowserRouter })
    expect(screen.getByRole('status')).toBeInTheDocument();
  })
  it('Should remove the loading spinner once the book\'s cover image is loaded.', async () => {
    render(<BookCover book={book} />, { wrapper: BrowserRouter })
    const bookCover = screen.getByRole('img')
    fireEvent.load(bookCover)
    expect(screen.queryByRole('status')).toBeNull();
  })
})
