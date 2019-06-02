const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
var todoItem = new Schema({ name: String, done: Boolean });
var ItemSchema = new Schema({
    title: {
        type: String
    },
    note: {
        type: String,
        require: true
    },
    todoList: [todoItem],
    
    tipo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);