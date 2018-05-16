'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="not-found">
        <h1>404</h1>
        <h2>P&aacute;gina no encontrada! </h2>
        <p>
          <Link to="/">Volver a la p&aacute;gina de inicio.</Link>
        </p>
      </div>
    );
  }
}
