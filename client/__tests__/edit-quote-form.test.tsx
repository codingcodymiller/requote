import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom'

import EditQuoteForm from '../components/edit-quote-form'
import { server } from '../__mocks__/server';
import { rest } from 'msw';

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
  it('Should have Submit button disabled when the Quote textarea is empty.', () => {
    server.use(
      rest.get('/api/quote/:quoteId', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.set('Content-Type', 'application/json'),
          ctx.json({
            page: 1,
            quoteText: '',
            isPrivate: false
          }));
      })
    )
    render(<EditQuoteForm quoteId="1" />, { wrapper: BrowserRouter })
    const page = screen.getByRole('spinbutton')
    waitFor(() => expect(page).toHaveValue('1'));

    const submit = screen.getByTitle(/submit/i);
    expect(submit).toBeDisabled()
  })
})
