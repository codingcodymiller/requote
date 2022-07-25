import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import FormInput from '../components/form-input';
import FormTextArea from '../components/form-textarea';
import { SelectedBookContext } from '../pages/library';

export default function SaveQuoteForm(props) {
  const { bookId } = useContext(SelectedBookContext).bookData;
  if (!bookId) return <Navigate to="../book-search" />;

  const handleSubmit = e => {
    event.preventDefault();
    // const quoteData = {
    //   page: e.target.elements.page.value,
    //   quote: e.target.elements.quote.value,
    //   bookId
    // };
    // console.log('Quote Data:', quoteData);
    // fetch('/api/save', {
    //   method: 'post',
    //   body: quoteData
    // })
    //   .then(res => res.json())
    //   .then(res => props.updateResults(res.items));
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
