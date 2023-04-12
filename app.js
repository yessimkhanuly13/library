let myLibrary = [];
const title = document.querySelector('#info');
const author = document.querySelector('#info1');
const pages = document.querySelector('#info2');
const read = document.querySelector('#info3');
const btn = document.querySelector('#btn');
const container = document.querySelector('.container');

function Book(title, author, pages, read ){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
     
        return this.title + ' by ' + this.author + ' ,' + this.pages + ' pages, ' + this.read;
    }
}

function addBookToLibrary(){
    if(title.value.length === 0 || author.value.length === 0 || pages.value.length === 0){
        alert("Please fill all the fields!");
        return;
    }
    const newBook = new Book(title.value, author.value, pages.value, read.value);
    myLibrary.push(newBook);
}

function clearValue() {
    title.value = null;
    author.value = null;
    pages.value = null;
    read.value = null;
    return ;
}


let hobbit = new Book('The Hobbit','J.R.R. Tolkien', 295, 'not read yet');

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    addBookToLibrary();
    clearValue();
})