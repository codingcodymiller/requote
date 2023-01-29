import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import SectionHeader from '../components/section-header';
import BookCarousel from '../components/book-carousel';
import QuoteSearch from '../components/quote-search';
import QuoteList from '../components/quote-list';
import { QuoteData } from '../components/quote-list-item';
import NoQuotes from '../components/no-quotes';
import NoResults from '../components/no-results';

export const QuotesContext = React.createContext<QuotesContextValue>({} as QuotesContextValue);

export type QuotesContextValue = {
  bookId?: string;
  sortType: string;
  isReversed: boolean;
  searchTerm: string;
  quoteList: QuoteData[];
  updateQuoteList: Dispatch<SetStateAction<never[]>>
}

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

  const contextValue = { bookId, sortType, searchTerm, isReversed, quoteList, updateQuoteList }

  return (
    <QuotesContext.Provider value={contextValue}>
      <SectionHeader text="Quotes" />
      { quoteList.length ? <BookCarousel /> : <></> }
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
    </QuotesContext.Provider>
  )
}
