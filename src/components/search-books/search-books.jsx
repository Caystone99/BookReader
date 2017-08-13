import React from 'react';
import {Link} from 'react-router-dom';
import Book from '../book/book';
import Loading from '../loading/loading';
import * as BooksAPI from '../../api/BooksAPI';
import {MAX_RESULT} from '../../config/config';
import PropTypes from 'prop-types';

class searchBooks extends React.Component {

  static propTypes = {
    normalizeBooks: PropTypes.func.isRequired,
    currentBooks: PropTypes.array.isRequired
  };

  getInitialState = () => {
    return {
      booksOnQuery: [],
      query: '',
      loading: true,
      error: null
    };
  };
  // Using constructor in ES6
  constructor(...props) {
    super(...props);
    // We will know it gets the initial state
    this.state = this.getInitialState();
  }
  // if the search Result is on the local shelf, the change the data.
  _indexOnShelf = (book) => {
    let currentIndex = this.props.currentBooks.findIndex((item) => {
      return item.id === book.id;
    });
    return currentIndex;
  };

  // private _getBooks fetch data from server
  _getBooks = (e) => {
    // Bundle the input with view
    let tempValue = e.target.value;
    this.setState({query: tempValue});
    // Deal with undefined input
    if (!tempValue) {
      return null;
    }
    // debounce function to avoid too much net request
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      // console.log(tempValue);
      BooksAPI.search(tempValue, MAX_RESULT).then((books) => {
        books.map((book)=>{
          let sIndex = this._indexOnShelf(book);
          if(sIndex !== -1)  {
            // console.log(this.props.currentBooks[sIndex]);
            book.shelf = this.props.currentBooks[sIndex].shelf;
          }
          return null;
        });
        // console.log(books);
        if (books.length > 0) {
          this.setState({
            loading: false,
            booksOnQuery: books,
            error: null
          });
          // console.log(books);
        } else {
          console.log('We cannot find anything');
        }
      }).catch(() => {
        this.setState(this.getInitialState());
      });
    }, 200);
    return null;
  };

  render() {
    const {loading, booksOnQuery, query} = this.state;
    return (
      <div className="search-books">
        {(loading) ? <Loading /> : ''}
        <div className="search-books-bar">
          <Link to="/" className="close-search"></Link>
          <div className="search-books-input-wrapper">
            <input type="text"
                   value={query}
                   placeholder="Search by title or author"
                   onChange={this._getBooks}/>
          </div>
        </div>
        <div className="search-books-results">
          <Book booksArray={loading ? [] : booksOnQuery} {...this.props}/>
        </div>
      </div>
    );
  }
}

export default searchBooks;
