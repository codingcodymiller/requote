import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NoQuotes from './no-quotes';
import QuoteListItem, {QuoteData} from './quote-list-item';

type QuoteListProps = {
  quotes: QuoteData[]
}

export default function QuoteList(props: QuoteListProps){
  const quotes = props.quotes.map(quote => <QuoteListItem quote={quote} key={quote.quoteId} />  )

  const { hash } = useLocation();

  useEffect(() => {
    if (hash !== '') {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 50);
    }
  }, [hash]);

  return (
    <div className="row">
      { quotes }
    </div>
  )
}
