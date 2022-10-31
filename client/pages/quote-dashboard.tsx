import React from 'react';

import {QuoteData} from '../components/quote-list-item';
import { SortStateUpdate } from '../components/quote-search';
import QuoteSearch from '../components/quote-search';
import QuoteList from '../components/quote-list'
import SectionHeader from '../components/section-header'

type QuotesState = {
  searchTerm: null | string;
  sortType: string;
  isReversed: boolean;
  quoteList: QuoteData[];
}

export default class QuoteDashboard extends React.Component {
  state: QuotesState = {
    searchTerm: null,
    sortType: "date",
    isReversed: false,
    quoteList: []
  }

  componentDidMount(){
    this.getQuotes();
  }

  getQuotes(){
    const { sortType, isReversed } = this.state;
    const order = isReversed ? "ascending" : "descending";
    fetch(`/api/quotes?sort=${sortType}&order=${order}`)
    .then(res => res.json())
    .then(res => {
      this.updateQuoteList(res)
    });
  }

  updateQuoteList(quoteList: QuoteData[]){
    this.setState({ quoteList })
  }

  updateSortType(sortData: SortStateUpdate){
    this.setState(sortData);
  }

  render(){
    return (
      <>
        <SectionHeader text="Quotes" />
        <QuoteSearch
          sortType={this.state.sortType}
          isReversed={this.state.isReversed}
          updateQuoteList={this.updateQuoteList.bind(this)}
          updateSortType={this.updateSortType.bind(this)}
        />
        <QuoteList quotes={this.state.quoteList} />
      </>
    )
  }
}
