'use strict';

function onInit() {
    renderBooks();
    doTrans();
    renderPagination()
}

function renderBooks() {
    var books = getBooks();
    var strHTMLs = books.map(book => {
        return `<tr><td>${book.id}</td><td>${book.name}</td><td>${book.price}$</td><td><button
        data-trans="on-read" onclick="onReadBook('${book.id}')">Read</button><button
        data-trans="on-update" onclick="onUpdateBook('${book.id}')">Update</button><button
        data-trans="on-delete" onclick="onDeleteBook('${book.id}')">Delete</button></td> </tr>`
    }).join('');
    document.querySelector('.add-books').innerHTML = strHTMLs;
}

function renderPagination() {
    var elContainer = document.querySelector('.pagination-container')
    var strHtml = ''
    var pagesCount = getSize()
    for (let i = 0; i < pagesCount; i++) {
        strHtml += `<button onclick="onSetPage(${i})">${i + 1}</button>`
    }
    elContainer.innerHTML = strHtml
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}


function onSetPage(pageIdx) {
    setPageCurrIdx(pageIdx);
    renderBooks();
}

function onSortBy(isChar) {
    asecnding = !asecnding;
    isChar ? gBooks.sort(sortByChar) : gBooks.sort(sortById);

    renderBooks();
}

function onAddBook() {
    // var newName = prompt('New book name?');
    // var newPrice = +prompt('New book price?');
    const elName = document.querySelector('input[name=book]');
    const elPrice = document.querySelector('input[name=price]');
    const name = elName.value;
    const price = elPrice.value;
    if (name && price) {

        var book = addBook(name, price);
        renderBooks()
        renderPagination()
        flashMsg(`New Book added:${book.name}`)
        elName.value = '';
        elPrice.value = '';
    }
}

function onReadBook(bookId) {
    var book = readBook(bookId);
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('h4 span').innerText = book.id
    elModal.querySelector('p').innerText = book.dsc
    elModal.classList.add('open')

}

function onUpdateBook(bookId) {
    var newPrice = +prompt('New Price?');
    if (newPrice) {
        const book = updateBook(bookId, newPrice);
        renderBooks()
        flashMsg(`Book ${book.name}, Price updated to:${book.price}`)
    }

}

function onDeleteBook(bookId) {
    var book = deleteBook(bookId);
    renderBooks();
    renderPagination()
    flashMsg(`Book deleted *${book.name}*`)
}




function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans();
    // renderBooks();
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var transKey = el.dataset.trans;
        var txt = getTrans(transKey);
        if (el.nodeName === 'BUTTON') {
            // el.setAttribute('placeholder', txt)
            //THE SAME!
            el.innerText = txt
        } else el.innerText = txt
    })
}