import React from 'react';
import SearchBar from './search-bar';
import QuoteSort from './quote-sort'
import { SortStateUpdate } from '../pages/quote-dashboard'

type QuoteSearchProps = {
  sortType: string;
  isReversed: boolean;
  updateSearchTerm: (searchTerm: string) => void;
  updateSortType: (sortData: SortStateUpdate) => void;
}

export default function QuoteSearch (props: QuoteSearchProps) {
  const { sortType, isReversed, updateSortType, updateSearchTerm } = props;
  return (
    <div className="row justify-content-evenly align-items-center">
      <div className="col-10 col-xs-11 pe-0">
        <div className="row">
          <SearchBar handleSearchSubmit={updateSearchTerm} placeholder="Search..." />
        </div>
      </div>
      <div className="col-2 col-xs-1 px-1">
        <QuoteSort sortType={sortType} isReversed={isReversed} updateSortType={updateSortType} />
      </div>
    </div>
  )
}
