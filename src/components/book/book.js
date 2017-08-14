import React from 'react';
import BookShelfChanger from '../bookshelf-changer/bookshelf-changer';
import PropTypes from 'prop-types';

class Book extends React.Component {

  static propTypes = {
    booksArray: PropTypes.array.isRequired
  };

  render() {
    const { booksArray } = this.props;
    return (
      <ol className="books-grid">
        {(booksArray.length > 0) ?
          booksArray.map((book, index) => (
            <li key={index}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style = {{width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}}>
                  </div>
                  <BookShelfChanger book={book} {...this.props} />
                </div>
                <div className="book-title">{book.title}</div>
              </div>
            </li>
          )) :
          <div> No results </div>
        }
      </ol>
    );
  }
}

export default Book;
