'use strict';

import React, { Component } from 'react';
import {
  CURRENTLY_READING,
  WANT_TO_READ,
  READ
} from '../consts';
import _ from 'lodash';

export default class Item extends Component {
  shelfChange(bookId, shelfId) {
    this.props.shelfChange(bookId, shelfId);
  }

  render() {
    let { currentlyCheckStyle, wantToCheckStyle, readCheckStyle, noneCheckStyle } = styles;

    if (this.props.shelf === CURRENTLY_READING) {
        currentlyCheckStyle = { ...currentlyCheckStyle, opacity: 1 };
    } else if (this.props.shelf === WANT_TO_READ) {
        wantToCheckStyle = { ...wantToCheckStyle, opacity: 1 };
    } else if (this.props.shelf === READ) {
        readCheckStyle = { ...readCheckStyle, opacity: 1 };
    } else if (this.props.shelf === '' || _.isUndefined(this.props.shelf)) {
        noneCheckStyle = { ...readCheckStyle, opacity: 1 };
    }

    return (
      <div className="item">
        <a className="button">▼</a>
        <div className="popup">
          <ul>
            <li className="disabled">Mover a...</li>
            <li>
              <a href="javascript:void(0)" onClick={() => this.shelfChange(this.props.id, CURRENTLY_READING)}>Leyendo actualmente</a>
              <span className="check" style={ currentlyCheckStyle }>✓</span>
            </li>
            <li>
              <a href="javascript:void(0)" onClick={() => this.shelfChange(this.props.id, WANT_TO_READ)}>Quisiera leerlo</a>
              <span className="check" style={ wantToCheckStyle }>✓</span>
            </li>
            <li>
              <a href="javascript:void(0)" onClick={() => this.shelfChange(this.props.id, READ)}>Leído</a>
              <span className="check" style={ readCheckStyle }>✓</span>
            </li>
            <li>
              <a href="javascript:void(0)" onClick={() => this.shelfChange(this.props.id, '')}>Ninguno</a>
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