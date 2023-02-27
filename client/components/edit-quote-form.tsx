import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from './rich-text-editor';
import DropZone from './dropzone'
import FormControlInput from './form-control-input';
import FormControlLabel from './form-control-label';

type QuoteData = {
  page: string;
  quoteText: string;
  isPrivate: boolean;
}

type EditProps = {
  quoteId: string;
}

export default function EditQuoteForm({quoteId}: EditProps) {
  const navigate = useNavigate();
  const [page, updatePage] = useState('');
  const [quote, updateQuote] = useState('')
  const [isPrivate, updateQuotePrivacy] = useState(false);
  const [tooltipVisible, updateTooltipVisibility] = useState(false);
  useEffect(() => {
    let isComponentMounted = true;

    fetch(`/api/quote/${quoteId}`)
    .then(res => res.json())
    .then(({ page, quoteText, isPrivate }: QuoteData) => {
      if (!isComponentMounted) return;
      updatePage(page);
      updateQuote(quoteText);
      updateQuotePrivacy(isPrivate);
    });

    return () => { isComponentMounted = false }
  }, [quoteId])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const quoteData = {
      page: page || null,
      quoteText: quote,
      isPrivate
    };
    fetch(`/api/quote/${quoteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quoteData)
    })
      .then(res => {
        if (res.status === 401) {
          window.location.href = '/api/logout'
          return;
        } else if(res.status !== 204){
          throw new Error("Quote edit did not complete successfully")
        }
        navigate(`/quotes#${quoteId}`)
      })
      .catch(err => {
        console.error(err)
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
        <div className="d-flex justify-content-end align-items-center">
          <div
            className="mx-3 fs-5 d-flex align-items-center"
            aria-label={`
              Public quotes will be viewable by other users when shared,
              whereas private quotes will be only visible in your personal quote feed.
            `}
            data-balloon-length="fit"
            data-balloon-pos="up-right"
            data-balloon-visible={tooltipVisible || null}
          >
            <div className="form-check form-switch mb-0 curser-pointer">
              <input className="form-check-input" type="checkbox" role="switch" name="make-public" id="make-public" checked={!isPrivate} onChange={() => updateQuotePrivacy(!isPrivate)} />
              <label className="form-check-label" htmlFor="make-public">
                Make Public
              </label>
            </div>
            <i
              className="fa-solid fa-circle-info mx-2 text-light-grey"
              onClick={() => updateTooltipVisibility(!tooltipVisible)}
              onMouseOver={() => updateTooltipVisibility(true)}
              onMouseOut={() => updateTooltipVisibility(false)}
            ></i>
          </div>
          <button className="btn btn-lg btn-navy my-2" disabled={quote === ''}>Submit</button>
        </div>
      </form>
    </>
  );
}
