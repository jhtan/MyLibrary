'use strict';

import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import _ from 'lodash';
import * as BooksAPI from '../../BooksAPI';
import Item from '../common/Item';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.props.updateSearchResult([]);
  }

  shelfChange(bookId, shelfId) {
    this.props.updateSearchResult( this.props.searchResult.map( book =>
      book.id === bookId ? { ...book, shelf: shelfId } : book
    ) );

    if (this.props.books.every( book => book.id !== bookId )) {
      this.props.updateBooks( [...this.props.books, {
        ...this.props.searchResult.find( book => book.id === bookId ), shelf: shelfId
      }] );
    } else {
      this.props.updateBooks( this.props.books.map( book =>
        book.id === bookId ? { ...book, shelf: shelfId } : book
      ) );
    }
  }

  handleOnChange(event) {
      this.props.updateSearchResult([]);
      this.setState({ loading: true });

      BooksAPI.search(event.target.value)
        .then(books => {
          this.setState({ loading: false });

          if(!_.isUndefined(books.error)) {
            return this.props.updateSearchResult([]);
          } else {
            return this.props.updateSearchResult(books.map( book => {
              this.props.books.forEach( bookSelected => {
                book.id === bookSelected.id ? book.shelf = bookSelected.shelf : ''
              });

              return book;
            }));
          }
        })
        .catch(error => {
          console.log('error? o_O');
          this.props.updateSearchResult([]);
          this.setState({ loading: false });
        });
  }

  render() {
    let className = 'void-search';

    this.state.loading ? className += ' loading' : '';

    return (
      <div className="search-container">
        <div className="search-box">
          <a href="javascript:void(0)" onClick={() => {
            browserHistory.goBack();
          }} className="back-button" >←</a>
          <input type="text" placeholder="Buscar por título o autor" onChange={this.handleOnChange.bind(this)} />
        </div>
        { this.props.searchResult.length > 0 &&
        <div className="items">
          { this.props.searchResult.map(book =>
              <Item
                key={book.id}
                id={book.id}
                title={book.title}
                author={ _.isUndefined(book.authors) ? [] : book.authors.join(', ') }
                coverPageThumbnail={ _.isUndefined(book.imageLinks) ? 'img/default.png' : book.imageLinks.smallThumbnail }
                shelf={book.shelf}
                shelfChange={ (bookId, shelfId) => this.shelfChange(bookId, shelfId) }
              />
          ) }
        </div>
        }
        { this.props.searchResult.length === 0 &&
        <div className={ className }>
          <span><em>Escriba arriba para buscar</em></span>
        </div>
        }
      </div>
    );
  }
};