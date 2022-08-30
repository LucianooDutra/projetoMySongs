import React from 'react';
import '../css/notFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div className="notFound" data-testid="page-not-found">
        <h1>Error 404 page not found</h1>
      </div>
    );
  }
}

export default NotFound;
