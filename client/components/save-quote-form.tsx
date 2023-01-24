import React, { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import RichTextEditor from './rich-text-editor';
import DropZone from './dropzone'
import FormControlInput from './form-control-input';
import FormControlLabel from './form-control-label';
import Modal from './modal';
import { SelectedBookContext } from '../pages/save-quote';

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
    fetch('/api/save', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quoteData)
    })
      .then(res => {
        if(res.status === 401){
          throw new Error("Not logged in")
        }
        return res.json()
      })
      .then(() => {
        sessionStorage.removeItem("quote-to-save")
        navigate('/quotes', { replace: false })
      })
      .catch(err => {
        console.error(err)
        sessionStorage.setItem("quote-to-save", JSON.stringify(quoteData));
        toggleModal(!modalVisible)
      })
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
          className="position-relative col-12 p-2 border-1 border-light rounded shadow-sm"
          value={page}
          updateValue={updatePage}
        />
        <DropZone updateQuote={updateQuote} quote={quote} />
        <FormControlLabel
          label="Quote"
          id="quote"
        />
        <div className="col-12 br-10 shadow-sm mb-3">
          <RichTextEditor
            id="quote"
            placeholder="Once upon a midnight dreary..."
            value={quote}
            onChange={updateQuote}
          />
        </div>
        <div className="text-end">
          <button className="btn btn-lg btn-navy my-2">Submit</button>
        </div>
      </form>
      <Modal isOpen={modalVisible} handleClose={() => toggleModal(!modalVisible)} className="text-center">
        <img className="d-block mx-auto col-8" src="/images/login.svg" alt="man opening door" />
        <h2 className="my-2">This action requires login!</h2>
        <p>You can login with your Google account by clicking the button below</p>
        <p>
          <em>Don't worry, we'll preserve your quote for you until you return</em>
        </p>
        <a className="btn btn-navy" href="/api/login">Login with Google</a>
      </Modal>
    </>
  );
}
