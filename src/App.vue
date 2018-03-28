<template>
<!-- This HTML code does not need to be changed, but you should move it around to break it up into components. -->
<div id="app" class="container">
    <div class="page-header">
        <h1>My Favorite Books</h1>
    </div>
    <!-- TODO: make this element into a new component template -->
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Add New Books</h3>
        </div>
        <div class="panel-body">
            <form id="form" class="form-inline" @submit.prevent="addBook">
                <div class="form-group">
                    <label for="bookTitle">Title:</label>
                    <input type="text" id="bookTitle" class="form-control" v-model="newBookInput.title">
                </div>
                <div class="form-group">
                    <label for="bookAuthor">Author:</label>
                    <input type="text" id="bookAuthor" class="form-control" v-model="newBookInput.author">
                </div>
                <input type="submit" class="btn btn-primary" value="Add Book">
            </form>
        </div>
    </div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Book List</h3>
        </div>
        <div class="panel-body">
            <table class="table">
                <thead>
                    <tr>
                        <th class="first"></th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th></th>
                    </tr>
                </thead>
                <!-- TODO: make this element into a new component template -->
                <tbody v-for="book in books">
                    <tr>
                        <td class="first" rowspan="2"><img :src="book.imgUrl" /></td>
                        <td class="top"><a :href="book.url">{{book.title}}</a></td>
                        <td class="top">{{book.author}}</td>
                        <td class="top">{{book.year}}</td>
                        <td class="top">
                            <span class="glyphicon glyphicon-trash"
                                  aria-hidden="true"
                                  @click="removeBook(book)">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">{{book.description}}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
// This code will NEED to updated to use the JSON data structure returned from the Google Books API

// use Firebase to save data user entered
import Firebase from 'firebase';

var config = {
    apiKey: "AIzaSyALmW2B2aJOtwCbikL6fI3RyfZejpKvgYI",
    authDomain: "book-list-70bcc.firebaseapp.com",
    databaseURL: "https://book-list-70bcc.firebaseio.com",
    projectId: "book-list-70bcc",
    storageBucket: "book-list-70bcc.appspot.com",
    messagingSenderId: "167870498358"
}
var db = Firebase.initializeApp(config).database()
var booksRef = db.ref('books')

// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'App',
    // NOTE in a component, data must be a function that returns a NEW version of the values
    data () {
        return {
            newBookInput: {
                title: '',
                author: ''
            }
        }
    },
    // connect to single Firebase resource
    firebase: {
        books: booksRef
    },
    // components (HTML, CSS, and JS) used by this app
    components: {
        // TODO: add your new component(s) here
    },
    // functions you want to be called from HTML code
    methods: {
        // add book to the database after getting details from Google Books API
        addBook () {
            this.getBookDetails(this.newBookInput.title, this.newBookInput.author)
            this.resetInputValues()
        },
        // remove book from the database
        removeBook (book) {
            booksRef.child(book['.key']).remove()
        },
        // given title and author, get JSON data about the book to display
        getBookDetails (title, author) {
            // encode user input for inclusion within URL
            var encodedTitle = encodeURIComponent(title),
                encodedAuthor = encodeURIComponent(author),
                url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodedTitle}+inauthor:${encodedAuthor}&maxResults=1`
            // get JSON data to fill in specific book data
            fetch(url).then(response => response.json())
                      .then(data => {
                            // only one result is returned to reduce data load, but it still is returned as an Array
                            var bookInfo = data.items[0]
                            // TODO: replace dummy data below with correct fields within given JSON data
                            booksRef.push({
                                title: title,
                                author: author,
                                year: '2001',                         // TODO: find book's publication date
                                description: 'Interesting book',      // TODO: find book's description
                                url: 'https://google.com',            // TODO: find link to the book's information
                                imgUrl: this.makeURLSecure('http://files.selar.co/product-images/2017/products/demo/preorder-physical-product-selar.co-59d1e525c3a96.jpg'), // TODO: find link to the book's thumbnail image
                            })
                       })
                      .catch(error => console.log(error))
        },
        // clear input form to prepare for the next entry
        resetInputValues () {
            this.newBookInput.title = ''
            this.newBookInput.author = ''
        },
        // some URLs in the book data still refer to http directly instead of https, so convert them
        makeURLSecure (url) {
            return url.replace(/^http:/, 'https:')
        }
    }
}
</script>

<style lang="scss" scoped>
/*
 * This CSS code will need to be changed to verify components have different styles.
 * You will also need to move it around to break it up into components.
 */

/* TODO: move styles to the appropriate component where they would most closely apply */
$formColor: cornflowerblue;
$submitColor: hotpink;
$tableColor: rebeccapurple;

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: $formColor;
    margin-top: 20px;
}

.btn-primary {
    background-color: $submitColor;
}

.first {
    width: 1%;
}

.top {
    height: 1.5em;
}

img {
    height: 200px;
}

.table {
    color: $tableColor;
}
</style>
