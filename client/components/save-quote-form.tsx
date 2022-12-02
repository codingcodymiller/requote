import React, { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import DropZone from './dropzone'
import FormControlInput from './form-control-input';
import FormControlTextArea from './form-control-textarea';
import FormControlLabel from './form-control-label';
import { SelectedBookContext } from '../pages/save-quote';
import { AuthContext } from './auth';

type QuoteData = {
  page: string | null;
  quoteText: string;
  bookTitle: string;
  bookAuthors: string[];
  bookImage: string;
  bookDescription: string;
  isbn: string;
}

export default function SaveQuoteForm() {
  const navigate = useNavigate();
  const selectedBook = useContext(SelectedBookContext);
  let { isbn, title, authors, image, description } = selectedBook.data;
  const { isAuthenticated } = useContext(AuthContext)
  let quoteData: QuoteData = {} as QuoteData;
  if(!isbn) {
    const quoteInProgress = sessionStorage.getItem("quote-to-save");
    if (quoteInProgress !== null) {
      quoteData = JSON.parse(quoteInProgress);
      ({ isbn, bookTitle: title, bookAuthors: authors, bookImage: image, bookDescription: description } = quoteData);
      const bookData = { isbn, title, authors, image, description }
      selectedBook.setBookData(bookData);
    } else {
      return <Navigate to="/save-quote/book-search" />;
    }
  }

  const [modalVisible, toggleModal] = useState(false);
  const [page, updatePage] = useState(quoteData.page || '');
  const [quote, updateQuote] = useState(quoteData.quoteText || '')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const quoteData = {
      page: page || null,
      quoteText: quote,
      bookTitle: title,
      bookAuthors: authors,
      bookImage: image,
      bookDescription: description,
      isbn
    };
    if(isAuthenticated){
      fetch('/api/save', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quoteData)
      })
        .then(res => res.json())
        .then(res => navigate('/quotes', { replace: false }));
    } else {
      sessionStorage.setItem("quote-to-save", JSON.stringify(quoteData));
      toggleModal(!modalVisible)
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControlLabel
          label="Page Number"
          id="page-number"
          optional
        />
        <FormControlInput
          type="number"
          name="page"
          id="page-number"
          placeholder="Ex: 42"
          value={page}
          updateValue={updatePage}
        />
        <DropZone updateQuote={updateQuote} />
        <FormControlLabel
          label="Quote"
          id="quote"
        />
        <FormControlTextArea
          name="quote"
          id="quote"
          value={quote}
          updateValue={updateQuote}
          rows={6}
          placeholder="Once upon a midnight dreary..."
          required
        />
        <div className="text-end">
          <button className="btn btn-lg btn-navy my-2">Submit</button>
        </div>
      </form>
      <div className={`position-fixed fill-area bg-shadow d-flex justify-content-center align-items-center ${modalVisible ? '' : 'd-none'}`}>
        <div className="modal-container rounded shadow col-8 col-md-6 col-lg-4 p-5 text-center">
          <img className="d-block mx-auto col-8" src="/images/login.svg" alt="man opening door" />
          <h2 className="my-2">This action requires login!</h2>
          <p>You can login with your Google account by clicking the button below</p>
          <p>
            <em>Don't worry, we'll preserve your quote for you until you return</em>
          </p>
          <div className="text-center">
            <a className="btn btn-navy" href="http://localhost:3000/api/login">Login with Google</a>
          </div>
        </div>
      </div>
    </>
  );
}
