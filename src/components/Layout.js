'use strict';

import React from 'react';
import * as BooksAPI from '../BooksAPI';

export default class Layout extends React.Component {
  constructor(props) {
    super (props);

    this.state = {
      books: [],
      searchResult: [],
      loadingSections: true
    };
  }

  componentWillMount() {
    BooksAPI.getAll().then(result => {
      this.setState({
        books: result,
        loadingSections: false
      });
    });
  }

  updateBooks(newBooks) {
    this.setState({ books: newBooks });
  }

  updateSearchResult(newBooks) {
    this.setState({ searchResult: newBooks });
  }

  render() {
    return (
      <div className="fp-container">
        { { ...this.props.children, props: {
            ...this.props.children.props,
            books: this.state.books,
            searchResult: this.state.searchResult,
            updateBooks: this.updateBooks.bind(this),
            updateSearchResult: this.updateSearchResult.bind(this),
            loadingSections: this.state.loadingSections
        } } }
      </div>
    );
  }
}
