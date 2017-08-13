import React from 'react';
import PropTypes from 'prop-types';
import Book from "../book/book";
import {CAT_DEFINITION} from '../../config/config';

class Bookshelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    setBookShelf: PropTypes.func.isRequired
  };
  // This is a private method for Bookshelf
  // returns an Array of book objects based on category
  // (will read/read/currently reading)
  _findBooks = (category) => {
    let ret = [];
    if (!this.props.books) {
      return ret;
    }
    let allBooks = this.props.books;
    allBooks.map((book) => {
      if (book.shelf === category) {
        ret.push(book);
      }
      return null;
    });
    return ret;
  };

  render() {
    const { books } = this.props;

    // return only if we have obtained books in properties
    return ( books &&
      <div className="bookshelf">
        {CAT_DEFINITION.map((cat, index) => (
          <div key={'book' + index}>
            <h2 className="bookshelf-title">{cat.name}</h2>
            <div className="bookshelf-books">
              <Book booksArray={ this._findBooks(cat.tag)} {...this.props} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Bookshelf;
