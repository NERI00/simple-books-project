
let nameElement = document.getElementById("book-name-input")
let authorElement = document.getElementById("book-author-input")
let priceElement = document.getElementById("book-price-input")

let booksContainerElement = document.getElementById("books-container")

const addNewBook = () => {
    if (nameElement.value === '' || authorElement.value === '') {
        alert("Name or Author input is empty! Please try again...")
        return
    }

    // init the element
    let newId = Math.floor(Math.random() * 10000)
    let newBook = {
        id: newId, // TO DO: to fix in local storage task
        name: nameElement.value,
        author: authorElement.value,
        price: Number(priceElement.value)
    }

    // get from local storage
    let jsonArray = localStorage.getItem("books-list")
    let booksList = JSON.parse(jsonArray)

    if (booksList === null) {
        booksList = []
    }

    // update list
    booksList.push(newBook)

    // set to local storage 
    let toJson = JSON.stringify(booksList)
    localStorage.setItem("books-list", toJson)

    // update list in html
    loadBooks()

    // clear input
    nameElement.value = ''
    authorElement.value = ''
    priceElement.value = ''
}

// create table and rows by booksList variable
const loadBooks = () => {
    let jsonArray = localStorage.getItem("books-list")
    let booksList = JSON.parse(jsonArray)

    if (booksList === null) {
        return
    }

    let table = `<div id="output-table">
                    <table id="books-table">
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th style="color: red;">Delete</th>
                    </tr>`

    for (let book of booksList) {
        table += `<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.price}</td>
                    <td>
                        <button onclick="handleDeleteBookById(${book.id})">Delete</button>
                    </td>
                 </tr>
                 </div>`
    }

    table += `</table>`

    booksContainerElement.innerHTML = table
}

const handleDeleteBookById = (id) => {
    // get from local storage
    let jsonArray = localStorage.getItem("books-list")
    let booksList = JSON.parse(jsonArray)

    let filteredBooksList = booksList.filter(el => el.id !== id)

    booksList = filteredBooksList

    // set to local storage 
    let toJson = JSON.stringify(booksList)
    localStorage.setItem("books-list", toJson)

    loadBooks()
}