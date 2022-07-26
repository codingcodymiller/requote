import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import FormInput from '../components/form-input';
import FormTextArea from '../components/form-textarea';
import { SelectedBookContext } from '../pages/library';

export default function SaveQuoteForm(props) {
  const { gBooksId } = useContext(SelectedBookContext).bookData;
  if (!gBooksId) return <Navigate to="../book-search" />;

  const handleSubmit = e => {
    event.preventDefault();
    const quoteData = {
      page: e.target.elements.page.value || null,
      quoteText: e.target.elements.quote.value,
      gBooksId
    };
    fetch('/api/save', {
      method: 'post',
      body: quoteData
    })
      .then(res => res.json())
      .then(res => <Navigate to="../book-search" />);
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
