let myLibrary = [];
const title = document.querySelector('#info');
const author = document.querySelector('#info1');
const pages = document.querySelector('#info2');
const read = document.querySelector('#info3');
const btn = document.querySelector('#btn');
const bookshelf = document.querySelector('#bookshelf');
const back  = document.querySelector('#return');
const addBook = document.querySelector('.add');


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

addBook.addEventListener('click', ()=>{
    document.getElementById('popup').style.display="flex";
    addBook.style.display = 'none';
    bookshelf.textContent = '';
    bookshelf.style.display = 'none';
})

back.addEventListener('click',()=>{
    document.getElementById('popup').style.display="none";
    addBook.style.display = 'block';
})

function createForm() {
    myLibrary.forEach((element)=>{
        let div = document.createElement('div');
        div.classList.add('par');
        let index = 0;
        div.setAttribute('id',`index-${index}`);
        for(let i = 0; i < 3; i++){
            let span = document.createElement('p');
            span.classList.add('span-form');
            if(i === 0){
                span.textContent = element.title;
            }else if( i === 1){
                span.textContent = element.author;
            }else if (i === 2){
                span.textContent = element.pages;
            }
            div.appendChild(span)
        }

        for(let i = 0; i < 2; i++){
            let button = document.createElement('button');
            if(i === 1){
                button.textContent = "Delete";
                button.setAttribute('id', `btn-${index}`);
            }else{
                button.textContent = element.read;
                button.setAttribute('id', `btn2-${index}`);
            }
            div.appendChild(button);
        }
        
        index++;
        bookshelf.appendChild(div);
    });
}

let hobbit = new Book('The Hobbit','J.R.R. Tolkien', 295, 'not read yet');

btn.addEventListener('click', (e)=>{
    addBook.style.display = 'block';
    document.getElementById('popup').style.display= 'none';
    bookshelf.style.display = 'grid';
    e.preventDefault();
    addBookToLibrary();
    clearValue();
    createForm();
})