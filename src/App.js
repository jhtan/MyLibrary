import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from './components/main_page/MainPage';
import SearchPage from './components/search_page/SearchPage';
import Book from './models/Book';
import * as BooksAPI from './BooksAPI';

export default class App extends Component {

  state = {
    books: [],
    loadingSections: true,
    searchText: ''
  };

  componentDidMount() {
    BooksAPI.getAll().then(result => {
      this.setState({
        books: result.map( apiBook => new Book(apiBook) ),
        loadingSections: false
      });
    });
  }

  updateBooks = (newBooks) => {
    this.setState({ books: newBooks });
  };

  updateSearchText = (text) => {
    this.setState({ searchText: text });
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={ () => (
            <MainPage
              books={this.state.books}
              loadingSections={this.state.loadingSections}
              updateBooks={this.updateBooks}
            />
          )}/>
          <Route path='/search' render={ () => (
            <SearchPage
              books={this.state.books}
              updateBooks={this.updateBooks}
              searchText={this.state.searchText}
              updateSearchText={this.updateSearchText}
            />
          )} />
        </Switch>
      </div>
    );
  }
};