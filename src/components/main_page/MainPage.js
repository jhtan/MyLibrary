'use strict';

import React, { Component } from "react";
import {
  CURRENTLY_READING,
  WANT_TO_READ,
  READ
} from '../consts';
import { browserHistory, Link } from 'react-router';
import Section from "./Section";

export default class MainPage extends Component {
  constructor(props) {
    super (props);

    // this.processBlinkResponse = this.processBlinkResponse.bind(this);
  }
  // state = {
  //   books: []
  // };

  shelfChange(bookId, shelfId) {
    this.props.updateBooks( this.props.books.map(book =>
      book.id === bookId ? { ...book, shelf: shelfId } : book
    ));
  }

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
            shelfChange={this.shelfChange.bind(this)}
            loading={this.props.loadingSections}
          />
          <Section
            title="Quisiera Leerlo"
            books={this.props.books.filter(book => book.shelf === WANT_TO_READ)}
            shelfChange={this.shelfChange.bind(this)}
            loading={this.props.loadingSections}
          />
          <Section
            title="Leído"
            books={this.props.books.filter(book => book.shelf === READ)}
            shelfChange={this.shelfChange.bind(this)}
            loading={this.props.loadingSections}
          />
          <a className="add-button" onClick={() => {
            browserHistory.push('search');
          }}><strong>+</strong></a>
        </div>
      </div>
    );
  }
};