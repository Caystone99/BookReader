import React from 'react';
import PropTypes from 'prop-types';
import Book from "../book/book";

class Bookshelf extends React.Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired
  };
  // This is a private method for Bookshelf
  // returns an Array of book objects based on category
  // (will read/read/currently reading)
  _findBooks = (category) => {
    let ret = [];
    if (!this.props.books) {
      return ret;
    }
    let ids = this.props.books[category];
    let allBooks = this.props.books.all;
    ids.map((id) => {
      let bookIndex =  allBooks.findIndex((elem) => {
        return elem.id === id;
      });
      ret.push(allBooks[bookIndex]);
      return null;
    });
    // console.log(ret);
    return ret;
  };

  render() {
    const { books, categories } = this.props;
    // return only if we have obtained books in properties
    return ( books &&
      <div className="bookshelf">
        {categories.map((cat, index) => (
          <div key={'book' + index}>
            <h2 className="bookshelf-title">{cat.name}</h2>
            <div className="bookshelf-books">
              <Book books={ this._findBooks(cat.tag) }/>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Bookshelf;
