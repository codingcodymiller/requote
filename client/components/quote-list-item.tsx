import React from 'react';
import { useNavigate } from 'react-router-dom';

export type QuoteData = {
  page: number | null;
  quoteText: string;
  quoteId: string;
  bookTitle: string;
  bookAuthors: string[];
}

type SingleQuoteProps = {
  quote: QuoteData
}

export default function QuoteListItem(props: SingleQuoteProps){
  const {quote} = props;
  const navigate = useNavigate();
  return (
    <div className="col-12 my-2 quote">
      <div className="card h-100 shadow-sm p-2 position-relative">
        <div className="row h-100">
          <div className="col-12">
            <div className="d-flex justify-content-between pb-1 px-1 mb-1 border-bottom">
              <i
                onClick={() => navigate(`/edit-quote/${quote.quoteId}`)}
                className="fa-regular fa-pen-nib text-light-grey text-decoration-none cursor-pointer hover-aqua-blue"
              ></i>
              <p className="tiny-text m-0">
                {quote.page ? `p.${quote.page}` : ""}
              </p>
            </div>
            <div
              className="px-1"
              dangerouslySetInnerHTML={{ __html: quote.quoteText}}
            ></div>
            <div className="row justify-content-end px-1">
              <div className="col-6 book-info">
                <p className="m-0 text-end">
                  -{quote.bookAuthors[0]}
                </p>
                <p className="m-0 text-end tiny-text two-line-truncate">
                  {quote.bookTitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
