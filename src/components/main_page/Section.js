import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { BookPropTypes } from '../../models/Book';
import Item from '../common/Item';

export default class Section extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(BookPropTypes).isRequired,
    shelfChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  shelfChange = (bookId, shelfId) => {
    this.props.shelfChange(bookId, shelfId);
  };

  render() {
    let className = 'section';
    if (this.props.loading) {
        className += ' loading';
    }

    return (
      <div className={className}>
        <span><strong>{this.props.title} ({this.props.books.length})</strong></span>
        <div className="items">
          {this.props.books.map(book =>
            <Item
              key={book.id}
              id={book.id}
              title={book.title}
              author={ _.isUndefined(book.authors) ? [] : book.authors.join(', ') }
              coverPageThumbnail={book.thumbnail}
              shelf={book.shelf}
              shelfChange={ (bookId, shelfId)  => this.shelfChange(bookId, shelfId) }
            />
          )}
        </div>
      </div>
    );
  }
}