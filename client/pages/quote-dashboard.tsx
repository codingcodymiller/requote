import React from 'react';

import QuoteList from '../components/quote-list'
import {QuoteData} from '../components/quote-list-item';
import SectionHeader from '../components/section-header'

type QuotesState = {
  searchTerm: null | string;
  quoteList: QuoteData[];
}

type QuoteSearchBody = {
  searchTerm: string;
}

export default class QuoteDashboard extends React.Component {
  state: QuotesState = {
    searchTerm: null,
    quoteList: []
  }

  componentDidMount(){
    this.getQuotes();
  }

  getQuotes(){
    fetch(`/api/quotes`)
    .then(res => res.json())
    .then(res => {
      this.updateQuoteList(res)
    });
  }

  searchQuotes(searchTerm: string){
    const reqBody: QuoteSearchBody = { searchTerm };
    fetch(
      `/api/quotes`,
      {
        method: "POST",
        body: JSON.stringify(reqBody)
      }
    )
    .then(res => res.json())
    .then(res => {
      this.updateQuoteList(res)
    });
  }

  updateQuoteList(quoteList: QuoteData[]){
    this.setState({ quoteList })
  }

  render(){
    return (
      <>
        <SectionHeader text="Quotes" />
        <QuoteList quotes={this.state.quoteList} />
      </>
    )
  }
}
