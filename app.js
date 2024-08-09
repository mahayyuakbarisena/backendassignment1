const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');

app.set('view engine', 'ejs')
app.get('/', (req,res) => {
    res.send("Assignment 1 Backend Sri FM Akbarisena TLK025");
});

app.get('/books/:id?', (req,res) => {
    const books = JSON.parse(fs.readFileSync('./books.json', 'utf8'));
    if (req.params.id){
        const book = Object.values(books).find(book => book.id == req.params.id);
        if (book === undefined){
            res.status(404).send("Book not found");
        } else {
            res.send(book);
        }
    } else {
        res.send(books);
    }
});

app.get('/ejs/books', (req, res) => {
    const books = JSON.parse(fs.readFileSync('./books.json', 'utf8'));
    res.render('bookList', {books});
});

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
})