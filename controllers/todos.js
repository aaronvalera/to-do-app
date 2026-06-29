const todosRouter = require("express").Router();
const Todo = require("../models/todo.js");
const User = require("../models/user.js");

todosRouter.get("/", async (req, res) => {
    const user = req.user;
    const todos = await Todo.find({ user: user.id });
    return res.status(200).json(todos);
});

todosRouter.post("/", async (req, res) => {
    const user = req.user;
    const { description } = req.body;
    const newTodo = new Todo({
        description,
        checked: false,
        user: user._id
    });
    const savedTodo = await newTodo.save();
    user.todos = user.todos.concat(savedTodo._id);
    await user.save();
    return res.status(201).json(savedTodo);
});

todosRouter.delete("/:id", async (req, res) => {
    const user = req.user;
    await Todo.findByIdAndDelete(req.params.id);
    user.todos.pull(req.params.id);
    await user.save();
    return res.sendStatus(204);
});

todosRouter.patch("/:id", async (req, res) => {
    const user = req.user;
    const { checked } = req.body;
    await Todo.findByIdAndUpdate(req.params.id, { checked });
    return res.sendStatus(200);
});

module.exports = todosRouter;