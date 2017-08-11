import React from 'react';
import PropTypes from 'prop-types';
import Book from "../book/book";

class Bookshelf extends React.Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired
  };

  _findBooks = (category) => {
    if (!this.props.books) {
      return null;
    }
    let ret = [];
    let ids = this.props.books[category];
    let allBooks = this.props.books.all;
    ids.map((id) => {
      let bookRet =  allBooks.findIndex((elem) => {
        return elem.id === id;
      });
      ret.push(allBooks[bookRet]);
      return null;
    });
    // console.log(ret);
    return ret;
  };

  render() {
    const { books, categories } = this.props;
    return ( books &&
      <div className="bookshelf">
        {categories.map((cat, index) => (
          <div key={'book' + index}>
            <h2 className="bookshelf-title">{cat.name}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                <Book books={ this._findBooks(cat.tag) }/>
              </ol>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Bookshelf;
