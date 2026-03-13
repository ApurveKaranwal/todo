import { useState } from "react";
export function CreateTodo({ onTodoAdded }) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    return <div>
        <input style={{
            padding: 10,
            margin: 10
        }} type="text" placeholder="title" value={title} onChange={function (e) {
            const value = e.target.value;
            setTitle(value);
        }}></input> <br></br>

        <input style={{
            padding: 10,
            margin: 10
        }} type="text" placeholder="description" value={description} onChange={function (e) {
            const value = e.target.value;
            setDescription(value);
        }}></input> <br></br>

        <button style={{
            padding: 10,
            margin: 10
        }} onClick={() => {
            fetch("http://localhost:8080/todo", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(async function (res) {
                    const json = await res.json();
                    setTitle("");
                    setDescription("");
                    if (onTodoAdded) {
                        onTodoAdded();
                    }
                })
        }}>Add a ToDo</button>
    </div>
}