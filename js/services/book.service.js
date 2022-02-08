'use strict';

const STORAGE_KEY = 'booksDB';
const PAGE_SIZE = 3
var gBooks;
var asecnding = false;
var gCurrIdx = 0;
var gSortBy;
_createBooks()

// gCurrIdx * bookSize

//-- doesnt add price right, how to add pages, sorting takes a few more click maybe beacuse flag?, books getting id and passing a string -- //

function _createBook(name, price = getRandomIntInclusive(0, 99)) {
    return {
        id: makeId(),
        name,
        price,
        dsc: makeLorem()
    }
}

function getBooks() {
    let books = gBooks.slice(gCurrIdx, gCurrIdx + PAGE_SIZE)
        // if (gCurrIdx + PAGE_SIZE > gBooks.length - 1) books = gBooks.slice(gCurrIdx, gBooks.length - 1)
    return books;
}

// change function name
function getSize() {
    return Math.ceil(gBooks.length / PAGE_SIZE)
}


function setPageCurrIdx(pageIdx) {
    gCurrIdx = PAGE_SIZE * pageIdx;
}


function sortByChar(a, b) {
    if (!asecnding) {

        return (a.name.toUpperCase() > b.name.toUpperCase()) - (a.name.toUpperCase() < b.name.toUpperCase())
    } else {
        return (a.name.toUpperCase() < b.name.toUpperCase()) - (a.name.toUpperCase() > b.name.toUpperCase())
    }



    // var nameA = a.name.toUpperCase();
    // var nameB = b.name.toUpperCase();
    // if (nameA < nameB) {
    //     return -1;
    // }
    // return 1;
}



function sortById(a, b) {
    if (!asecnding) {
        return a.id - b.id;
    } else {
        return b.id - a.id;
    }


}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY);
    if (!books || !books.length) {

        books = [
            _createBook('Harry Pooper'),
            _createBook('Book')

        ]
    }
    gBooks = books
    _saveBooksToStorage();

}

function addBook(name, price) {
    var newBook = _createBook(name, price);
    gBooks.unshift(newBook);
    _saveBooksToStorage();
    return newBook
}

function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
    return book;
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = newPrice
    _saveBooksToStorage();
    return book
}

function deleteBook(bookId) {
    const book = gBooks.find(book => book.id === bookId);
    gBooks.splice(book, 1);
    _saveBooksToStorage();
    return book
}

// function setBookSort(sortBy) {
//     gSortBy = sortBy
//     getBooks();
//     return
// }

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}