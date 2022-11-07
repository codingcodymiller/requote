import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuoteSearch from '../components/quote-search';
import QuoteList from '../components/quote-list'
import SectionHeader from '../components/section-header'

type QuoteSearchBody = {
  searchTerm: string;
}

type RequestHeaders = {
  "Content-Type": string;
}

type RequestConfig = {
  method: string;
  headers?: RequestHeaders,
  body?: string;
}

interface Props { match?: { params: { bookId: string; }; }; }

export default function QuoteDashboard (props: Props) {
  const [isMounted, updateIsMounted] = useState(true);
  const [searchTerm, updateSearchTerm] = useState('');
  const [sortType, updateSortType] = useState('date');
  const [isReversed, updateIsReversed] = useState(false);
  const [quoteList, updateQuoteList] = useState([]);
  const { bookId } = useParams();

  const getQuotes = () => {
    let config: RequestConfig = {
      method: "get"
    }
    if (searchTerm) {
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
    fetch(`/api/quotes${bookId ? `/${bookId}` : ''}?sort=${sortType}&order=${order}`, config)
    .then(res => res.json())
    .then(res => {
      if(!isMounted) return;
      updateQuoteList(res)
    });
  }

  useEffect(() => {
    getQuotes();
    return () => updateIsMounted(false)
  })

  return (
    <>
      <SectionHeader text="Quotes" />
      <QuoteSearch
        sortType={sortType}
        isReversed={isReversed}
        updateSortType={updateSortType}
        updateIsReversed={updateIsReversed}
        updateSearchTerm={updateSearchTerm}
      />
      <QuoteList quotes={quoteList} />
    </>
  )
}
