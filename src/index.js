import {initializeApp} from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs, addDoc,
    deleteDoc, doc

} from 'firebase/firestore'

let myLibrary = [];
// import 'firebase/firestore'



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5RljPUM8hqhozRApaUvswrPkcD8WEyNs",
    authDomain: "library-615c6.firebaseapp.com",
    projectId: "library-615c6",
    storageBucket: "library-615c6.appspot.com",
    messagingSenderId: "407174088743",
    appId: "1:407174088743:web:1e2872abd379c164142602",
    measurementId: "G-SQVYL09ZBP"
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, 'books')


const title = document.querySelector('#info');
const author = document.querySelector('#info1');
const pages = document.querySelector('#info2');
const read = document.querySelector('#info3');
const btn = document.querySelector('#btn');
const bookshelf = document.querySelector('#bookshelf');
const back  = document.querySelector('#return');
const addBook = document.querySelector('.add');
const edit = document.querySelector('.edit');


// class Book {
//     constructor(title, author, pages, read){
//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//         this.read = read;  
//     }
    
// }

function addBookToLibrary(){
    if(title.value.length === 0 || author.value.length === 0 || pages.value.length === 0){
        alert("Please fill all the fields!");
        return;
    }
    // const newBook = new Book(title.value, author.value, pages.value, read.value);
    
    
    addDoc(colRef, {
        title: title.value,
        author: author.value,
        pages: pages.value,
        read: read.value
    })
        .then((docRef)=>{
           console.log(docRef.id)
        })

        console.log(myLibrary)
}

function clearValue() {
    title.value = null;
    author.value = null;
    pages.value = null;
    read.value = null;
    return ;
}

addBook.addEventListener('click', (e)=>{
    e.preventDefault();
    document.getElementById('popup').style.display="flex";
    addBook.style.display = 'none';
    bookshelf.textContent = '';
    bookshelf.style.display = 'none';
})

back.addEventListener('click',()=>{
    document.getElementById('popup').style.display="none";
    addBook.style.display = 'block';
    bookshelf.style.display = 'grid';
    createForm();
})




function createForm() {
    let index = 1;
    myLibrary.forEach((element)=>{

        let div = document.createElement('div');
        div.classList.add('par');
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

        createButtonDel(index, div, element);


        index++;
        bookshelf.appendChild(div);
    });
}


function createButtonDel(index, div, value) {
    let button = document.createElement('button');
    button.textContent = "Delete";
    let div2 = document.createElement('div');
    div2.classList.add('div-2');
    button.addEventListener('click' , (e)=>{
        e.preventDefault();
        myLibrary.splice(index - 1, 1);
        document.getElementById(`index-${index}`).remove();
        const docRef = doc(db, 'books', element.id);
        console.log(docRef)
    })
    div2.appendChild(button);

    let button2 = document.createElement('button');
    button2.textContent = value.read;
    button2.addEventListener('click', ()=>{ 
        if(value.read === 'Read'){
            value.read = 'Not read yet';
            button2.textContent = value.read;
            console.log(myLibrary);
        }else{
            value.read = 'Read';
            button2.textContent = value.read;
            console.log(myLibrary);
        }
    })
    div2.appendChild(button2);

    div.appendChild(div2);
}


btn.addEventListener('click', (e)=>{
    addBook.style.display = 'block';
    document.getElementById('popup').style.display= 'none';
    bookshelf.style.display = 'grid';
    addBookToLibrary();
    clearValue();
    createForm();
})

getDocs(colRef)
    .then((snapshot)=>{
        snapshot.docs.forEach((doc)=>{
            myLibrary.push({...doc.data(), id:doc.id})
        })
})