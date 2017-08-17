import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Book from './Book';


class SearchBooks extends Component {

	state = {
		searchBooks: [],
		query: ''
	}

	static propTypes = {
    	books: PropTypes.array.isRequired,
    	onUpdateShelf: PropTypes.func.isRequired
  	}

  	fetchSearchResults = (query) => {
    	this.setState({
    		query: query.trim()
    	})

    	BooksAPI.search(query, 10).then((searchResultBooks) => {
    		searchResultBooks = this.setShelf(searchResultBooks);
          	this.setState({
          		searchBooks: searchResultBooks
          	})
        })
    }

    setShelf = (searchResultBooks) => {
    	searchResultBooks.map((searchResultBook) => {
    			let duplicateBook = this.props.books.filter((currentShelfBook) => (searchResultBook.id === currentShelfBook.id));
    			if(duplicateBook.length !== 0){
    				searchResultBook.shelf=duplicateBook[0].shelf;
    			}
    			else
    				searchResultBook.shelf="none";
    	})
    	return searchResultBooks;
    }


	render() {
		const { onUpdateShelf } = this.props;
		const { query, searchBooks } = this.state;

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
                			<input type="text"
                			   value={query}
                			   placeholder="Search by title or author"
                			   onChange={(event) => this.fetchSearchResults(event.target.value)}
                			/>
              		</div>
				</div>

				<div className="search-books-results">
              		<ol className="books-grid">
              			{searchBooks.map((book) => (
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
		);
	}
}

export default SearchBooks;