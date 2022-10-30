import React from 'react';

import {QuoteData} from '../components/quote-list-item';
import QuoteSearch from '../components/quote-search';
import QuoteList from '../components/quote-list'
import SectionHeader from '../components/section-header'

type QuotesState = {
  searchTerm: null | string;
  quoteList: QuoteData[];
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

  updateQuoteList(quoteList: QuoteData[]){
    this.setState({ quoteList })
  }

  render(){
    return (
      <>
        <SectionHeader text="Quotes" />
        <QuoteSearch updateQuoteList={this.updateQuoteList.bind(this)}/>
        <QuoteList quotes={this.state.quoteList} />
      </>
    )
  }
}
