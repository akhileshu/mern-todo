// models/Book.js

const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  
  description: {
    type: String,
    required: true
  },
  createdTimeStamp: {
    type: String,
    required: true
  },
  
  updatedTimeStamp: {
    type: String,
    
  }
});


// module.exports = modelname = mongoose.model(collectionName, schemaName);
exports.Todo = mongoose.model('todos', TodoSchema);