import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import SaveQuoteForm from '../components/save-quote-form'
import { BookData, SelectedBookContext } from '../pages/save-quote'


describe('<SaveQuoteForm />', () => {
  it('Should have tooltip visible when the info icon for making a quote public is clicked.', () => {
    renderForm();
    const infoIcon = screen.getByTitle(/public explanation/i)
    fireEvent.click(infoIcon);
    const tooltip = screen.getByLabelText('Public quotes will be viewable by other users when shared', { exact: false });
    expect(tooltip).toHaveAttribute('data-balloon-visible', 'true')
  })
  // it('Should have Submit button disabled while the form is empty.', () => {
  //   render(<SaveQuoteForm />, { wrapper: BrowserRouter })

  //   const submit = screen.getByTitle(/submit/i);
  //   expect(submit).toBeDisabled()
  // })
})

function renderForm(){
  const context = {
    data: {
      title: 'Test',
      image: '/path-to-cover.jpg',
      authors: ['codingcodymiller'],
      isbn: '21312-4564-325',
      description: 'It\'s just a test :)'
    },
    setBookData: function (book: BookData) {
      this.data = book;
    }
  }
  render(
    <BrowserRouter>
      <SelectedBookContext.Provider value={context}>
        <SaveQuoteForm />
      </SelectedBookContext.Provider>
    </BrowserRouter>
  )
}
