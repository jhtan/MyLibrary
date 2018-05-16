/**
 * Created by jhtan on 11/23/16.
 */

'use strict';

import React from 'react';

export default class Box extends React.Component {
  render() {
    return (
      <div className="box-report box-error">
            <div className="box-error-inner">
        Disculpe las molestias, pero el sistema indica que usted ya canjeó su almuerzo.
        </div>
      </div>
    );
  }
}