import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuoteSearch from '../components/quote-search';
import QuoteList from '../components/quote-list'
import NoQuotes from '../components/no-quotes';
import SectionHeader from '../components/section-header'
import NoResults from '../components/no-results';

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
  const [searchTerm, updateSearchTerm] = useState('');
  const [sortType, updateSortType] = useState('date');
  const [isReversed, updateIsReversed] = useState(false);
  const [quoteList, updateQuoteList] = useState([]);
  const { bookId } = useParams();

  useEffect(() => {
    let isComponentMounted = true;

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
      if (!isComponentMounted) return;
      updateQuoteList(res)
    })
    .catch(err => {
      console.error("error:", err)
    });

    return () => { isComponentMounted = false }
  }, [searchTerm, sortType, isReversed])



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
      {
        quoteList.length > 0 ?
          <QuoteList quotes={quoteList} /> :
          searchTerm ?
            <NoResults /> :
            <NoQuotes />
      }
    </>
  )
}
