import React from 'react';

export type QuoteData = {
  page: number;
  quoteText: string;
  quoteId: number;
  bookTitle: string;
  bookAuthors: string[];
}

type SingleQuoteProps = {
  quote: QuoteData
}

export default function QuoteListItem(props: SingleQuoteProps){
  const {quote} = props;
  return (
    <div className="col-12 my-2">
      <div className="card h-100 shadow-sm p-3 position-relative">
        <div className="row h-100">
          <div className="col-12">
            <p className="m-0 preserve-whitespace">"{quote.quoteText}"</p>
            <div className="row justify-content-end">
              <div className="col-6 book-info">
                <p className="m-0 text-end">-{quote.bookAuthors[0]}</p>
                <p className="m-0 text-end tiny-text two-line-truncate">{quote.bookTitle}</p>
              </div>
            </div>
            <p className="position-absolute top-right tiny-text">{quote.page ? `p.${quote.page}` : ""}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
