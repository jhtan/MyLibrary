import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { BookPropTypes } from '../../models/Book';
import _ from 'lodash';
import Book from '../../models/Book';
import * as BooksAPI from '../../BooksAPI';
import defaultImage from '../../img/default.png';
import Item from '../common/Item';

export default class SearchPage extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(BookPropTypes).isRequired,
    updateBooks: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired,
    updateSearchText: PropTypes.func.isRequired
  };

  state = {
    searchResult: [],
    loading: false
  };

  componentDidMount() {
    if(this.props.searchText.length > 0) {
      this.handleOnChange({target: {value: this.props.searchText}});
    }
  }

  shelfChange = (bookId, shelfId) => {
    if (this.props.books.every( book => book.id !== bookId )) {
      this.props.updateBooks( [...this.props.books, {
        ...this.state.searchResult.find( book => book.id === bookId ), shelf: shelfId
      }] );
    } else {
      this.props.updateBooks( this.props.books.map( book =>
        book.id === bookId ? { ...book, shelf: shelfId } : book
      ) );
    }
  };

  handleOnChange = (event) => {
    this.props.updateSearchText(event.target.value);
    this.beginSearch();
  };

  beginSearch = _.debounce(() => {
    this.setState({
      loading: true,
      searchResult: []
    });

    BooksAPI.search(this.props.searchText)
      .then(books => {
        this.setState({
          loading: false,
          searchResult: _.isUndefined(books.error) ? books.map( book => new Book(book)) : []
        });
      })
      .catch(error => {
        console.log('error? o_O');
        this.setState({
          loading: false,
          searchResult: []
        });
      });
  }, 2000, { 'flush': true });

  render() {
    let className = 'void-search';

    if(this.state.loading) {
      className += ' loading';
    }

    let booksToRender = this.state.searchResult.map( book => {
      let shelfBook = this.props.books.find( shelfBook => shelfBook.id === book.id );
      if(!_.isUndefined(shelfBook)) {
        book.shelf = shelfBook.shelf;
      }
      return book;
    } );

    return (
      <div className="search-container">
        <div className="search-box">
          <Link to="/" className="back-button">←</Link>
          <input type="text" value={this.props.searchText} placeholder="Buscar por título o autor" onChange={this.handleOnChange} />
        </div>
        { this.state.searchResult.length > 0 &&
        <div className="items">
          { booksToRender.map(book =>
              <Item
                key={book.id}
                id={book.id}
                title={book.title}
                author={ _.isUndefined(book.authors) ? [] : book.authors.join(', ') }
                coverPageThumbnail={ book.thumbnail === '' ? defaultImage : book.thumbnail }
                shelf={ book.shelf }
                shelfBook={ this.props.books.find( shelfBook => shelfBook.id === book.id ) }
                shelfChange={ (bookId, shelfId) => this.shelfChange(bookId, shelfId) }
              />
          ) }
        </div>
        }
        { this.state.searchResult.length === 0 &&
        <div className={ className }>
          <span><em>Escriba arriba para buscar</em></span>
        </div>
        }
      </div>
    );
  }
};