import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { QuotesContext, QuotesContextValue } from '../pages/quote-dashboard'

export type QuoteData = {
  page: number | null;
  quoteText: string;
  isPrivate: boolean;
  quoteId: string;
  bookTitle: string;
  bookAuthors: string[];
}

type SingleQuoteProps = {
  quote: QuoteData
}

export default function QuoteListItem(props: SingleQuoteProps){
  const { bookId, sortType, searchTerm, isReversed, updateQuoteList }: QuotesContextValue = useContext(QuotesContext)
  const {quote} = props;
  const navigate = useNavigate();
  const deleteOptionsRef = useRef(null);
  const [inProp, setInProp] = useState(false);

  const handleDelete = () => {
    const quoteData = {
      quoteId: quote.quoteId
    }
    fetch(`/api/delete-quote`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quoteData)
    })
      .then(res => {
        if (res.status !== 204) {
          throw new Error("Quote deletion failed")
        }
        const order = isReversed ? "ascending" : "descending";
        fetch(`/api/quotes${bookId ? `/${bookId}` : ''}?sort=${sortType}&order=${order}${searchTerm ? `&searchTerm=${searchTerm}` : ''}`)
          .then(res => res.json())
          .then(res => {
            updateQuoteList(res)
          })
          .catch(err => {
            console.error("error:", err)
          });
      })
      .catch(err => {
        console.error(err)
      })
  }
  return (
    <div className="col-12 my-2 quote" id={quote.quoteId}>
      <div className="card h-100 shadow-sm p-2 position-relative">
        <div className="row h-100">
          <div className="col-12">
            <div className="d-flex justify-content-between pb-1 px-1 mb-1 border-bottom">
              <div className="position-relative">
                <div className="position-relative z-index-10 bg-white">
                  <i
                    onClick={() => navigate(`/edit-quote/${quote.quoteId}`)}
                    className="fa-regular fa-lg fa-pen-nib text-light-grey text-decoration-none cursor-pointer hover-aqua-blue mx-1"
                  ></i>
                  <i
                    onClick={() => setInProp(!inProp)}
                    className="fa-regular fa-lg fa-eraser text-light-grey text-decoration-none cursor-pointer hover-aqua-blue mx-1"
                  ></i>
                </div>
                <CSSTransition nodeRef={deleteOptionsRef} in={inProp} timeout={500} classNames="delete-options">
                  <div ref={deleteOptionsRef} className="delete-options">
                    <i
                      onClick={() => setInProp(!inProp)}
                      className="fa-regular fa-lg fa-xmark text-danger cursor-pointer mx-1"
                    ></i>
                    <i
                      onClick={handleDelete}
                      className="fa-regular fa-lg fa-check text-success cursor-pointer mx-1"
                    ></i>
                  </div>
                </CSSTransition>
              </div>
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
            <p className="m-0 position-absolute bottom-left tiny-text text-light-grey">
              <i className={`mx-1 fa-solid fa-${quote.isPrivate ? "eye-slash" : "eye"}`}></i>
              {quote.isPrivate ? "Private" : "Public"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
