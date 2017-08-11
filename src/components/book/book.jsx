import React from 'react';
import BookShelfChanger from '../bookshelf-changer/bookshelf-changer';
import PropTypes from 'prop-types';

class Book extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired
  };

  render() {
    const { books } = this.props;
    return (
      <div>
        {books.map((book, index) => (
          <div className="book" key={index}>
            <div className="book-top">
              <div className="book-cover" style = {{width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
              </div>
              <BookShelfChanger />
            </div>
            <div className="book-title">{book.title}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Book;
