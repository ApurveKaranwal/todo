export function Todos({ todos }) {
    return <div>
        {todos.map((todo) => (
            <div key={todo._id} style={{
                padding: 10,
                margin: 10,
                border: "1px solid #ccc",
                borderRadius: 5
            }}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <button onClick={() => {
                    fetch("http://localhost:8080/completed", {
                        method: "PUT",
                        body: JSON.stringify({
                            id: todo._id
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(async (res) => {
                        const json = await res.json();
                        window.location.reload();
                    })
                }}>
                    {todo.completed ? "Completed" : "Mark as Completed"}
                </button>
            </div>
        ))}
    </div>
}
