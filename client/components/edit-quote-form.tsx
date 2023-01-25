import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from './rich-text-editor';
import DropZone from './dropzone'
import FormControlInput from './form-control-input';
import FormControlLabel from './form-control-label';

type QuoteData = {
  page: string;
  quoteText: string;
}

type EditProps = {
  quoteId: string;
}

export default function EditQuoteForm({quoteId}: EditProps) {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const quoteData = {
      page: page || null,
      quoteText: quote
    };
    fetch(`/api/quote/${quoteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quoteData)
    })
      .then(res => {
        if(res.status !== 204){
          throw new Error("Quote edit did not complete successfully")
        }
        navigate(`/quotes#${quoteId}`)
      })
      .catch(err => {
        console.error(err)
      })
  };
  const [page, updatePage] = useState('');
  const [quote, updateQuote] = useState('')
  useEffect(() => {
    let isComponentMounted = true;

    fetch(`/api/quote/${quoteId}`)
      .then(res => res.json())
      .then(({ page, quoteText }: QuoteData) => {
        if (!isComponentMounted) return;
        updatePage(page);
        updateQuote(quoteText);
      });

    return () => { isComponentMounted = false }
  }, [quoteId])
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
    </>
  );
}
