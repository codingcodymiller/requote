import React from 'react';
import QuoteListItem, {QuoteData} from './quote-list-item';

type QuoteListProps = {
  quotes: QuoteData[]
}

export default function QuoteList(props: QuoteListProps){
  const quotes = props.quotes.map(quote => <QuoteListItem quote={quote} key={quote.quoteId} />  )
  return (
    <div className="row">
      { quotes }
    </div>
  )
}
