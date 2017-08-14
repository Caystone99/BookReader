import React from 'react';
import PropTypes from 'prop-types';
// import * as BooksAPI from '../../api/BooksAPI';

class BookshelfChanger extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired
  };

  state = {
    value: 'none'
  };

  handleChange = (e) => {
    e.preventDefault();
    // We call the function in the father component
    const {book, setBookShelf} = this.props;
    setBookShelf(book, e.target.value);
  };

  componentDidMount() {
    this.setState({
      value: ( this.props.book.shelf === 'undefined') ?  'none' : this.props.book.shelf
    })
  }

  render() {
    const {value} = this.state;
    return (
      <div className="book-shelf-changer">
        <select value={value} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookshelfChanger;
