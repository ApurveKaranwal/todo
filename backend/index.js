const express = require("express");
const { createTodo, updateTodo } = require("./types");
const app = express();
const { todo } = require("./db");
const cors = require("cors");
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.post("/todo", async function (req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "you sent wrong input",
        });
        return;
    }

    try {
        const data = parsedPayload.data;
        await todo.create({
            title: data.title,
            description: data.description,
            completed: false,
        });
        res.json({ msg: "Todo created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "internal server error" });
    }
});

app.get("/todos", async (req, res) => {
    try {
        const todos = await todo.find({});
        res.json({ todos });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "internal server error" });
    }
});

app.put("/completed", async function (req, res) {
    const parsedPayload = updateTodo.safeParse(req.body);
    if (!parsedPayload.success) {
        res.status(411).json({ msg: "you sent wrong input" });
        return; //this return statement is here to end the function when if parsedPayload.sucess!=true;
    }

    try {
        const { id } = parsedPayload.data;
        await todo.updateOne({ _id: id }, { completed: true });
        res.json({ msg: "Todo marked as completed" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "in ternal server error" });
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));