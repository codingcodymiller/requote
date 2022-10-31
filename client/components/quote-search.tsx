import React from 'react';
import SearchBar from './search-bar';
import QuoteSort from './quote-sort'
import { QuoteData } from '../components/quote-list-item';

type QuoteSearchBody = {
  searchTerm: string;
}

type QuoteSearchProps = {
  sortType: string;
  isReversed: boolean;
  updateSortType: (sortData: SortStateUpdate) => void;
  updateQuoteList: (quoteList: QuoteData[]) => void;
}

type RequestHeaders = {
  "Content-Type": string;
}

type RequestConfig = {
  method: string;
  headers?: RequestHeaders,
  body?: string;
}

export type SortStateUpdate = {
  sortType?: string;
  isReversed?: boolean;
}

export default function QuoteSearch (props: QuoteSearchProps) {
  const { sortType, isReversed, updateSortType, updateQuoteList } = props;
  const searchQuotes = (searchTerm: string) => {
    let config: RequestConfig = {
      method: "get"
    }
    if(searchTerm){
      const reqBody: QuoteSearchBody = { searchTerm };
      config = {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      }
    }
    const order = isReversed ? "ascending" : "descending";
    fetch(`/api/quotes?sort=${sortType}&order=${order}`, config)
    .then(res => res.json())
    .then(res => {
      updateQuoteList(res)
    });
  }

  return (
    <div className="row justify-content-evenly align-items-center">
      <div className="col-10 col-xs-11 pe-0">
        <div className="row">
          <SearchBar handleSearchSubmit={searchQuotes} placeholder="Search..." />
        </div>
      </div>
      <div className="col-2 col-xs-1 px-1">
        <QuoteSort sortType={sortType} isReversed={isReversed} updateSortType={updateSortType} />
      </div>
    </div>
  )
}
