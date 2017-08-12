import React from 'react';
import Bookshelf from './components/bookshelf/bookshelf';
import SearchBooks from './components/search-books/search-books';
import {Route, Link} from 'react-router-dom';
import {CAT_DEFINITION, ERR_INFO} from './config/config';
import * as BooksAPI from './api/BooksAPI';
import './common/css/App.css';

/*eslint no-unused-vars: 1 */
class BooksApp extends React.Component {
  // To set the default state from beginning
  // Note that except all books should be fetched, other states will be read from local storage.
  getInitialState = () => {
    return {
      books: {
        // currentlyReading: ["nggnmAEACAAJ","jAUODAAAQBAJ"],
        // wantToRead: ["sJf1vQAACAAJ"],
        // read: ["evuwdDLfAyYC"],
        currentlyReading: [],
        wantToRead: [],
        read: [],
        all: []
      },
      loading: true,
      error: null
    }
  };
  // This function transform the data style
  _normalizeBooks = (books) => {
    let ret = Object.assign({}, this.state.books);
    // console.log(ret);
    books.map((book) => {
      ret[book.shelf].push(book.id);
      return null;
    });
    ret.all = books;
    return ret;
  };

  // Using constructor in ES6
  constructor(...props) {
    super(...props);
    //  the initial state
    this.state = this.getInitialState()
  }
  // This happens after DOM render action is finished.
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        loading: false,
        books: this._normalizeBooks(books)
      });
    }).catch((e) => {
      this.setState({
        books: {},
        loading: false,
        error: ERR_INFO
      });
      // alert('Error 0: Fetching data failed! Probably bad connection')
      console.log(`${ERR_INFO}:${e}`);
    })
  }
  // we will pass data into components
  render() {
    const {books, loading, error} = this.state;
    const {categories} = this.props;

    if(loading) {
      return <span>Loading!!!</span>;
    } else if(error !== null) {
      return <span>Error: {error}</span>
    } else {
      return (
        <div className="app">
          <Route exact path="/" render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>My Read App</h1>
              </div>
              <div className="list-books-content">
                <Bookshelf books={books} categories={categories}/>
              </div>
              <Link className="open-search" to="/create">
                <span>Add a book</span>
              </Link>
            </div>
          )}/>
          <Route path="/create" render={({ history }) => (
            <div><SearchBooks /></div>
          )}/>
        </div>
      );
    }
  }
}

// Default Property
BooksApp.defaultProps = {
  categories: CAT_DEFINITION
};

export default BooksApp
