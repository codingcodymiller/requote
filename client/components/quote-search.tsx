import React from 'react';
import SearchBar from './search-bar';
import { QuoteData } from '../components/quote-list-item';

type QuoteSearchBody = {
  searchTerm: string;
}

type QuoteSearchProps = {
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

export default function QuoteSearch (props: QuoteSearchProps) {
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
    fetch(`/api/quotes`, config)
    .then(res => res.json())
    .then(res => {
      props.updateQuoteList(res)
    });
  }

  return (
    <SearchBar handleSearchSubmit={searchQuotes} placeholder="" />
  )
}
