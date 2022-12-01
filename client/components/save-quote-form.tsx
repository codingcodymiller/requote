import React, { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import DropZone from './dropzone'
import FormControlInput from './form-control-input';
import FormControlTextArea from './form-control-textarea';
import FormControlLabel from './form-control-label';
import { SelectedBookContext } from '../pages/save-quote';

export default function SaveQuoteForm() {
  const navigate = useNavigate();
  const { isbn, title, authors, image, synopsis } = useContext(SelectedBookContext).data;
  if (!isbn) return <Navigate to="/save-quote/book-search" />;

  const [page, updatePage] = useState('');
  const [quote, updateQuote] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const quoteData = {
      page: page || null,
      quoteText: quote,
      bookTitle: title,
      bookAuthors: authors,
      bookImage: image,
      bookSynopsis: synopsis,
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
      .then(res => res.json())
      .then(res => navigate('/quotes', { replace: false }));
  };
  return (
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
  );
}
