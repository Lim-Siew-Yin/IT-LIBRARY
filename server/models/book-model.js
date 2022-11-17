const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
        email: { type: String },
        book: { type: String }
},{
    collection: 'book-search'
})

module.exports = mongoose.model("BookSearch", bookSchema);