import React from 'react';
import SectionHeader from '../components/section-header';
import SaveQuoteForm from '../components/save-quote-form';

export default function SaveQuote(props) {
  return (
    <>
      <SectionHeader text="Save Quote" />
      <SaveQuoteForm />
    </>
  );
}
