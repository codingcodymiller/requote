import React from 'react';
import { RouteProps } from 'react-router-dom';
import {QuoteData} from '../components/quote-list-item';
import QuoteSearch from '../components/quote-search';
import QuoteList from '../components/quote-list'
import SectionHeader from '../components/section-header'

type QuotesState = {
  searchTerm: string;
  sortType: string;
  isReversed: boolean;
  quoteList: QuoteData[];
}

type QuoteSearchBody = {
  searchTerm: string;
}

type RequestHeaders = {
  "Content-Type": string;
}

type RequestConfig = {
  method: string;
  headers?: RequestHeaders,
  body?: string;
}

export type SortStateUpdate = {
  sortType: string;
}

export type ReversedStateUpdate = {
  isReversed: boolean;
}

interface Props { match?: { params: { bookId: string; }; }; }

export default class QuoteDashboard extends React.Component<Props, QuotesState> {
  state = {
    searchTerm: '',
    sortType: "date",
    isReversed: false,
    quoteList: []
  }

  componentDidMount(){
    this.getQuotes();
  }

  getQuotes(){
    const { searchTerm } = this.state;
    let config: RequestConfig = {
      method: "get"
    }
    if (searchTerm) {
      const reqBody: QuoteSearchBody = { searchTerm };
      config = {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      }
    }

    const { sortType, isReversed } = this.state;
    const order = isReversed ? "ascending" : "descending";
    const bookId = this.props.match?.params.bookId;
    fetch(`/api/quotes${bookId ? `/${bookId}` : ''}?sort=${sortType}&order=${order}`, config)
    .then(res => res.json())
    .then(res => {
      this.updateQuoteList(res)
    });
  }

  updateQuoteList(quoteList: QuoteData[]){
    this.setState({ quoteList })
  }

  updateSortType(sortData: SortStateUpdate | ReversedStateUpdate){
    this.setState({...this.state, ...sortData}, this.getQuotes);
  }

  updateSearchTerm({ searchTerm }: QuoteSearchBody){
    this.setState({ searchTerm }, this.getQuotes)
  }

  render(){
    return (
      <>
        <SectionHeader text="Quotes" />
        <QuoteSearch
          sortType={this.state.sortType}
          isReversed={this.state.isReversed}
          updateSortType={this.updateSortType.bind(this)}
          updateSearchTerm={this.updateSearchTerm.bind(this)}
        />
        <QuoteList quotes={this.state.quoteList} />
      </>
    )
  }
}
