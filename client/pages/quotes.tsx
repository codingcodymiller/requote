import React from 'react';

import QuoteList from '../components/quote-list'
import {QuoteData} from '../components/quote-list-item';
import SectionHeader from '../components/section-header'

type QuotesState = {
  quoteList: QuoteData[]
}

export default class Quotes extends React.Component {
  state: QuotesState = {
    quoteList: []
  }

  componentDidMount(){
    this.getQuotes();
  }

  getQuotes(){
    fetch(`/api/quotes`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          quoteList: res
        })
      });
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
