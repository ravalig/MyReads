import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Book from './Book';


class Bookshelf extends Component {

	static propTypes = {
    	books: PropTypes.array.isRequired,
    	onUpdateShelf: PropTypes.func.isRequired,
    	shelf: PropTypes.string.isRequired
  	}

  	render() {
  		const { books, onUpdateShelf, shelf } = this.props;

    	return (
        	<div className="bookshelf">
            	<h2 className="bookshelf-title">{shelf}</h2>
            	<div className="bookshelf-books">
                	<ol className="books-grid">
                		{books.map((book) => (
                			<li key={book.id}>
                				<Book
                					book={book}
                					onUpdateShelf={onUpdateShelf}
                				/>
                			</li>
                		))}
                	</ol>
            	</div>
        	</div>
    	)
  	}
}


export default Bookshelf;