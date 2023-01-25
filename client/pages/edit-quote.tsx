import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SectionHeader from '../components/section-header';
import EditQuoteForm from '../components/edit-quote-form';

export default function EditQuote() {
  const { quoteId } = useParams();
  if(!quoteId){
    const navigate = useNavigate();
    navigate('/quotes');
    return <></>;
  }
  return (
    <>
      <SectionHeader text="Edit Quote" />
      <EditQuoteForm quoteId={quoteId} />
    </>
  );
}
