import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom'

import EditQuoteForm from '../components/edit-quote-form'

describe('<EditQuoteForm />', () => {
  it('Should have inputs automatically filled with the present values for the quote.', () => {
    render(<EditQuoteForm quoteId="1" />, { wrapper: BrowserRouter })
    const page = screen.getByRole('spinbutton')
    waitFor(() => expect(page).toHaveValue('1'));
  })
  it('Should have tooltip visible when the info icon for making a quote public is clicked.', () => {
    render(<EditQuoteForm quoteId="1" />, { wrapper: BrowserRouter })
    const infoIcon = screen.getByTitle(/public explanation/i)
    fireEvent.click(infoIcon);
    const tooltip = screen.getByLabelText('Public quotes will be viewable by other users when shared', { exact: false });
    expect(tooltip).toHaveAttribute('data-balloon-visible', 'true')
  })
})
