import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BookPropTypes } from '../../models/Book';
import {
  CURRENTLY_READING,
  WANT_TO_READ,
  READ
} from '../../consts';
import Section from "./Section";

export default class MainPage extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(BookPropTypes).isRequired,
    loadingSections: PropTypes.bool.isRequired,
    updateBooks: PropTypes.func.isRequired
  };

  shelfChange = (bookId, shelfId) => {
    this.props.updateBooks( this.props.books.map(book =>
      book.id === bookId ? { ...book, shelf: shelfId } : book
    ));
  };

  render() {
    return (
      <div>
        <header>
          <span><strong>Mis Libros</strong></span>
        </header>
        <div className="content">
          <Section
            title="Leyendo Actualmente"
            books={this.props.books.filter(book => book.shelf === CURRENTLY_READING)}
            shelfChange={this.shelfChange}
            loading={this.props.loadingSections}
          />
          <Section
            title="Quisiera Leerlo"
            books={this.props.books.filter(book => book.shelf === WANT_TO_READ)}
            shelfChange={this.shelfChange}
            loading={this.props.loadingSections}
          />
          <Section
            title="Leído"
            books={this.props.books.filter(book => book.shelf === READ)}
            shelfChange={this.shelfChange}
            loading={this.props.loadingSections}
          />
          <Link to='/search' className="add-button"><strong>+</strong></Link>
        </div>
      </div>
    );
  }
};