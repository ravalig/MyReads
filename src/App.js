import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        books: [],
        currentlyReading: [],
        wantToRead: [],
        read: [],
        shelf: ['currentlyReading', 'wantToRead', 'read']
    }

    updateShelf = (book, shelf) => {
        let currentBooks = this.state.books.filter((b) => (b.id !== book.id));
        book.shelf = shelf;
        currentBooks.push(book);
        this.setState({
            books: currentBooks
        })
        BooksAPI.update(book, shelf);
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books });
        })

        this.setState({ currentlyReading: this.state.books.filter((book) => (book.shelf ==='currentlyReading'))});
        this.setState({ wantToRead: this.state.books.filter((book) => (book.shelf ==='wantToRead'))});
        this.setState({ read: this.state.books.filter((book) => (book.shelf ==='read'))});

    }


    render() {
        const { books, shelf } = this.state;

        return (
            <div className="app">
                <Route exact path='/' render={() => (

                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>

                        <div className="list-books-content">
                            <div>
                                {
                                    shelf.map((shelf) => (
                                    <div key={shelf}>
                                        <Bookshelf
                                            books={books.filter((book) => (
                                                    book.shelf === shelf
                                                    ))}
                                            onUpdateShelf={this.updateShelf}
                                            shelf={shelf}
                                        />
                                    </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="open-search">
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route exact path='/search' render={() => (
                    <SearchBooks
                        books={books}
                        onUpdateShelf={this.updateShelf}
                    />
                )}/>

            </div>
        )
    }
}
export default BooksApp;