import React from 'react';
import SearchBar from './search-bar';
import QuoteControls from './quote-controls'

type QuoteSearchProps = {
  sortType: string;
  isReversed: boolean;
  disabled: boolean;
  updateSearchTerm: (searchTerm: string) => void;
  updateSortType: (sortType: string) => void;
  updateIsReversed: (isReversed: boolean) => void;
}

export default function QuoteSearch (props: QuoteSearchProps) {
  const { disabled, sortType, isReversed, updateSortType, updateSearchTerm, updateIsReversed } = props;
  return (
    <div className={`d-flex flex-nowrap justify-content-evenly align-items-center ${ disabled ? 'pe-none disabled' : '' }`}>
      <SearchBar className="flex-grow-1" handleSearchSubmit={updateSearchTerm} placeholder="Search..." />
      <QuoteControls
        sortType={sortType}
        isReversed={isReversed}
        updateSortType={updateSortType}
        updateIsReversed={updateIsReversed}
      />
    </div>
  )
}
