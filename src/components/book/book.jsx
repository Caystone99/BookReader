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
      <ol className="books-grid">
        {books.map((book, index) => (
          <li key={index}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style = {{width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                </div>
                <BookShelfChanger book={book} />
              </div>
              <div className="book-title">{book.title}</div>
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

export default Book;
