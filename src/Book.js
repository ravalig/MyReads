import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

class Book extends Component {

	static propTypes = {
    	book: PropTypes.object.isRequired,
    	onUpdateShelf: PropTypes.func.isRequired
  	}

	render() {

		const { book, onUpdateShelf } = this.props;


		return (

            <div key={book.id} className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 194, backgroundImage: "url("+book.imageLinks.thumbnail+")" }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={book.shelf}
                            		onChange={(event)=> onUpdateShelf(book, event.target.value)}
                            		>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                               	<option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors[0]}</div>
            </div>

		)
	}
}

export default Book;