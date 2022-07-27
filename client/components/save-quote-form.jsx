import React, { useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import FormInput from '../components/form-input';
import FormTextArea from '../components/form-textarea';
import { SelectedBookContext } from '../pages/library';

export default function SaveQuoteForm(props) {
  const navigate = useNavigate();
  const { gBooksId, title } = useContext(SelectedBookContext).bookData;
  if (!gBooksId) return <Navigate to="../book-search" />;
  const handleSubmit = e => {
    e.preventDefault();
    const quoteData = {
      page: e.target.elements.page.value || null,
      quoteText: e.target.elements.quote.value,
      bookTitle: title,
      gBooksId
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
      .then(res => navigate('../book-search', { replace: false }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Page Number"
        type="number"
        name="page"
        id="page-number"
        placeholder="Ex: 42"
        optional
      />
      <FormTextArea
        label="Quote"
        name="quote"
        id="page-number"
        rows="6"
        placeholder="Once upon a midnight dreary..."
        required
      />
      <div className="text-end">
        <button className="btn btn-lg btn-navy my-2">Submit</button>
      </div>
    </form>
  );
}
