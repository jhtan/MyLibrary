import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  CURRENTLY_READING,
  WANT_TO_READ,
  READ
} from '../../consts';
import _ from 'lodash';

export default class Item extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    coverPageThumbnail: PropTypes.string.isRequired,
    shelf: PropTypes.string,
    shelfBook: PropTypes.shape(),
    shelfChange: PropTypes.func.isRequired
  };

  shelfChange(bookId, shelfId) {
    this.props.shelfChange(bookId, shelfId);
  }

  render() {
    let { currentlyCheckStyle, wantToCheckStyle, readCheckStyle, noneCheckStyle } = styles;
    let shelf = this.props.shelf;

    // if(!_.isUndefined(this.props.shelfBook)) {
    //   shelf = this.props.shelfBook.shelf;
    // }

    if (shelf === CURRENTLY_READING) {
        currentlyCheckStyle = { ...currentlyCheckStyle, opacity: 1 };
    } else if (shelf === WANT_TO_READ) {
        wantToCheckStyle = { ...wantToCheckStyle, opacity: 1 };
    } else if (shelf === READ) {
        readCheckStyle = { ...readCheckStyle, opacity: 1 };
    } else if (shelf === '' || _.isUndefined(shelf)) {
        noneCheckStyle = { ...readCheckStyle, opacity: 1 };
    }

    return (
      <div className="item">
        <a className="button">▼</a>
        <div className="popup">
          <ul>
            <li className="disabled">Mover a...</li>
            <li>
              <span onClick={() => this.shelfChange(this.props.id, CURRENTLY_READING)}>Leyendo actualmente</span>
              <span className="check" style={ currentlyCheckStyle }>✓</span>
            </li>
            <li>
              <span onClick={() => this.shelfChange(this.props.id, WANT_TO_READ)}>Quisiera leerlo</span>
              <span className="check" style={ wantToCheckStyle }>✓</span>
            </li>
            <li>
              <span onClick={() => this.shelfChange(this.props.id, READ)}>Leído</span>
              <span className="check" style={ readCheckStyle }>✓</span>
            </li>
            <li>
              <span onClick={() => this.shelfChange(this.props.id, '')}>Ninguno</span>
              <span className="check" style={ noneCheckStyle }>✓</span>
            </li>
          </ul>
        </div>
        <div className="cover-image">
          <img src={this.props.coverPageThumbnail} alt={this.props.title} />
        </div>
        <div className="desc">
          <span>{this.props.title}</span>
          <span>{this.props.author}</span>
        </div>
      </div>
    );
  }
}

let styles = {
  currentlyCheckStyle: {
  },
  wantToCheckStyle: {
  },
  readCheckStyle: {
  },
  noneCheckStyle: {
  }
};