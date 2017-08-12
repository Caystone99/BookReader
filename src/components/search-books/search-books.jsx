import React from 'react';
import {Link} from 'react-router-dom';
import Book from '../book/book';
import * as BooksAPI from '../../api/BooksAPI';
import {MAX_RESULT} from '../../config/config';

class searchBooks extends React.Component {

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
    this.state = this.getInitialState()
  }

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
        if (books.length > 0) {
          this.setState({
            loading: false,
            booksOnQuery: books,
            error: null
          });
          console.log(books);
        } else {
          console.log('We cannot find anything');
        }
      }).catch((e) => {
        this.setState({
          booksOnQuery: [],
          loading: false,
          error: `Error:${e}`
        })
      });
    }, 200);
    return null;
  };

  render() {
    const {loading, booksOnQuery, query} = this.state;
    return (
      <div className="search-books">
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
          <Book books={(loading ? [] : (booksOnQuery || []))}/>
        </div>
      </div>
    );
  }
}

export default searchBooks;
