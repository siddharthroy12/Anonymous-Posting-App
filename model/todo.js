const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema for Todo
const TodoSchema = new  Schema ({
    action: {
        type: String,
        required: [true, "Todo text field is required"]
    },
    date: {
        type:Date,
        required: [true, "Date is required"],
        default: Date.now
    },
    ip: String, // Yes, not required
    createdAt: { type: Date, expires: '2m', default: Date.now }
})

const TodoModel = new mongoose.model('todo', TodoSchema)

module.exports = TodoModel