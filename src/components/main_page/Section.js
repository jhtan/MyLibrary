'use strict';

import React, { Component } from 'react';
import _ from 'lodash';
import Item from "../common/Item";

export default class Section extends Component {
  shelfChange(bookId, shelfId) {
    this.props.shelfChange(bookId, shelfId);
  }

  render() {
    let className = 'section';
    this.props.loading ? className += ' loading' : '';

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
              coverPageThumbnail={book.imageLinks.smallThumbnail}
              shelf={book.shelf}
              shelfChange={ (bookId, shelfId)  => this.shelfChange(bookId, shelfId) }
            />
          )}
        </div>
      </div>
    );
  }
}