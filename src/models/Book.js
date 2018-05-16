import PropTypes from 'prop-types';
import _ from 'lodash';

export default class Book {
  id = '';
  title = '';
  authors = [];
  thumbnail = '';
  shelf = '';

  constructor (apiBook) {
    this.id = apiBook.id;
    this.title = apiBook.title;
    this.authors = _.isUndefined(apiBook.authors) ? [] : apiBook.authors;
    this.thumbnail = _.isUndefined(apiBook.imageLinks) ? '' : apiBook.imageLinks.smallThumbnail;
    this.shelf = _.isUndefined(apiBook.shelf) ? '' : apiBook.shelf;
  }
}

export const BookPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  thumbnail: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired
});