import React from 'react';
import SearchBar from './search-bar';
import QuoteSort from './quote-sort'

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
    <div className={`row justify-content-evenly align-items-center ${ disabled ? 'pe-none disabled' : '' }`}>
      <div className="col-10 col-xs-11 pe-0">
        <div className="row">
          <SearchBar handleSearchSubmit={updateSearchTerm} placeholder="Search..." />
        </div>
      </div>
      <div className="col-2 col-xs-1 px-1">
        <QuoteSort
          sortType={sortType}
          isReversed={isReversed}
          updateSortType={updateSortType}
          updateIsReversed={updateIsReversed}
        />
      </div>
    </div>
  )
}
