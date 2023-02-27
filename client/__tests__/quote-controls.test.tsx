import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

import QuoteControls from '../components/quote-controls'

describe('<QuoteControls />', () => {
  it('Should show icons to filter, reverse, and share quotes if viewing a personal feed.', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'username=codingcodymiller',
    });
    render(
      <MemoryRouter initialEntries={['/quotes']}>
        <QuoteControls sortType='date' isReversed={false} updateIsReversed={() => {}} updateSortType={() => {}} />
      </MemoryRouter>
    )
    expect(screen.getByTitle('filter')).toBeVisible();
    expect(screen.getByTitle('reverse')).toBeVisible();
    expect(screen.getByTitle('share')).toBeVisible();
  })
  it('Should not show share quotes icon if viewing a shared feed.', () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'username=codingcodymiller',
    });
    render(
      <MemoryRouter initialEntries={['/codingcodymiller/quotes']}>
        <QuoteControls sortType='date' isReversed={false} updateIsReversed={() => { }} updateSortType={() => { }} />
      </MemoryRouter>
    )
    expect(screen.queryByTitle('share')).toBeNull();
  })
  it('Should show the modal containing filter options when the filter icon is clicked.', () => {
    render(
      <MemoryRouter initialEntries={['/quotes']}>
        <QuoteControls sortType='date' isReversed={false} updateIsReversed={() => { }} updateSortType={() => { }} />
      </MemoryRouter>
    )
    fireEvent.click(screen.getByTitle('filter'));
    expect(screen.getByLabelText(/date added/i)).toBeVisible();
    expect(screen.getByLabelText(/page number/i)).toBeVisible();
    expect(screen.getByLabelText(/quote length/i)).toBeVisible();
  })
})
