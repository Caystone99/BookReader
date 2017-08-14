import React from 'react';
import Loading from '../loading/loading';
import {Link} from 'react-router-dom';
import Bookshelf from '../bookshelf/bookshelf';
import PropTypes from 'prop-types';

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    setBookShelf: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div className="list-books">
        {(this.props.loading) ? <Loading /> : ''}
        <div className="list-books-title">
          <h1>My Read App</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf {...this.props} />
        </div>
        <Link className="open-search" to="/create">
          <span>Add a book</span>
        </Link>
      </div>
    )
  }
}

export default ListBooks;
