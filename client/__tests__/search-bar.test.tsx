import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import SearchBar from '../components/search-bar'

describe('<SearchBar />', () => {
  it('Should show the text a user types as the value of the search bar.', () => {
    render(<SearchBar placeholder='Search' handleSearchSubmit={() => {}} />, { wrapper: BrowserRouter })
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'The Hobbit' } })
    expect(searchInput).toHaveValue('The Hobbit')
  })
  // it('Should submit the form if the magnifying glass icon is clicked.', async () => {
  //   const submit = jest.fn()
  //   render(<SearchBar placeholder='Search' handleSearchSubmit={submit} />, { wrapper: BrowserRouter })

  //   const bookCover = screen.getByRole('img')
  //   fireEvent.load(bookCover)

  //   expect(screen.queryByRole('status')).toBeNull();
  // })
  // it('Should submit the form if the Enter button is pressed while the search bar is focused.', async () => {
  //   const submit = jest.fn()
  //   render(<SearchBar placeholder='Search' handleSearchSubmit={submit} />, { wrapper: BrowserRouter })

  //   const bookCover = screen.getByRole('img')
  //   fireEvent.load(bookCover)

  //   expect(screen.getByTitle(/book details/i)).toBeInTheDocument();
  // })
})
