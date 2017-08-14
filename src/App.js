import React from 'react';
import SearchBooks from './components/search-books/search-books';
import ListBooks from './components/list-books/list-books';
import {Route} from 'react-router-dom';
import {ERR_INFO} from './config/config';
import * as BooksAPI from './api/BooksAPI';
import './common/css/App.css';

/*eslint no-unused-vars: 1 */
class BooksApp extends React.Component {
  // To set the default state from beginning
  // Note that except all books should be fetched, other states will be read from local storage.
  getInitialState = () => {
    return {
      books: [],
      loading: true,
      error: null
    }
  };

  // If the child component want to change the state in the father component
  // it will use the function defined in father component.
  // The arrow function will ensure that 'this' is point to the father component
  // Use ... ES6 Syntax to pass it easily
  _setBookShelf = (book, shelf) => {
    let ret = this.state.books.slice();
    let index = this._findBookIndex(book.id);
    // If there is no book inside the state, we need to add this book to the end.
    if (index === -1) {
      ret = [book, ...ret];
      index = ret.length - 1;
    }
    // console.log(ret[index]);
    this.setState({
      loading: true
    });
    BooksAPI.update(ret[index], shelf).then(() => {
      ret[index].shelf = shelf;
      this.setState({
        loading: false,
        books: ret
      });
    }).catch(() => {
      console.log('Error updating Data');
    })
  };
  // This method help us to get the index of book.
  _findBookIndex = (id) => {
    return this.state.books.findIndex((book) => {
      return book.id === id
    })
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
        books
      });
    }).catch((e) => {
      this.setState({
        books: [],
        loading: false,
        error: ERR_INFO
      });
      console.log(`${ERR_INFO}:${e}`);
    })
  }

  render() {
    const {books, loading, error} = this.state;

    if(error !== null) {
      return <span>Error: {error}</span>
    } else {
      return (
        <div className="app">
          <Route exact path="/" render={() => (
            <ListBooks books={books}
                       loading={loading}
                       setBookShelf={(book, shelf) => {
              this._setBookShelf(book, shelf)}}
              />)} />
          <Route path="/create" render={({ history }) => (
            <div><SearchBooks currentBooks={books} setBookShelf={(id, shelf) => {this._setBookShelf(id, shelf)}} /></div>
          )}/>
        </div>
      );
    }
  }
}

// Default Property
// BooksApp.defaultProps = {
//   categories: CAT_DEFINITION
// };

export default BooksApp
