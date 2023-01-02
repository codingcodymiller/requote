import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuoteSearch from '../components/quote-search';
import QuoteList from '../components/quote-list'
import NoQuotes from '../components/no-quotes';
import SectionHeader from '../components/section-header'
import NoResults from '../components/no-results';

export default function QuoteDashboard () {
  const [searchTerm, updateSearchTerm] = useState('');
  const [sortType, updateSortType] = useState('date');
  const [isReversed, updateIsReversed] = useState(false);
  const [quoteList, updateQuoteList] = useState([]);
  const { bookId, username } = useParams();

  useEffect(() => {
    let isComponentMounted = true;

    const order = isReversed ? "ascending" : "descending";

    let url = null;
    if(username){
      url = `/api/${username}/shared-quotes${bookId ? `/${bookId}` : ''}?sort=${sortType}&order=${order}${searchTerm ? `&searchTerm=${searchTerm}` : ''}`
    } else {
      url = `/api/quotes${bookId ? `/${bookId}` : ''}?sort=${sortType}&order=${order}${searchTerm ? `&searchTerm=${searchTerm}` : ''}`;
    }

    fetch(url)
    .then(res => res.json())
    .then(res => {
      if (!isComponentMounted) return;
      updateQuoteList(res)
    })
    .catch(err => {
      console.error("error:", err)
    });

    return () => { isComponentMounted = false }
  }, [searchTerm, sortType, isReversed, bookId, username])



  return (
    <>
      <SectionHeader text="Quotes" />
      <QuoteSearch
        sortType={sortType}
        isReversed={isReversed}
        updateSortType={updateSortType}
        updateIsReversed={updateIsReversed}
        updateSearchTerm={updateSearchTerm}
        disabled={!quoteList.length && !searchTerm}
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
