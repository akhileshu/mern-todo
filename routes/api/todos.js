const express = require("express");
// initialize router
const router = express.Router();
// import model
const { Todo } = require("../../models/todo.js");

// @route GET api/books/test
// @description Test books route
// @access Public
router.get("/test", (req, res) => res.send("todo route testing!"));

// @route GET api/books
// @description Get all books
// @access Public
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    if (todos.length === 0) {
      return res.status(404).json({ error: "no todos" });
    } else {
      res.json(todos);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// @route POST api/books
// @description Add/save book
// @access Public
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json({ msg: "Todo added successfully", createdTodo: todo });
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// @route PUT api/books/:id
// @description Update book
// @access Public
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ msg: "Todo updated successfully", updatedTodo: todo });
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// @route PATCH api/books/:id
// @description Partially update book
// @access Public
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ msg: "Todo partially updated successfully", updatedTodo: todo });
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

// @route DELETE api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ msg: "Todo entry deleted successfully", deletedTodo: todo });
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

exports.todos = router;
