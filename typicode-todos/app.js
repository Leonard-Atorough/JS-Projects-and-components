const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const getTodos = () => {
  fetch(apiUrl + "?_limit=10")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((todo) => {
        addTodoToDom(todo);
      });
    });
};
const createTodo = (e) => {
  e.preventDefault();

  if (!e.target) console.error("no form element selected");
  const form = document.getElementById("todo-form");
  const formData = new FormData(form);

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      title: formData.get("title"),
      completed: false,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      addTodoToDom(data);
    });
};

const updateTodo = ({ id, completed }) => {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      completed,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

const deleteTodo = (e) => {
  if (!e.target.classList.contains("todo")) return;

  const item = e.target;
  const id = item.dataset.id;

  fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  }).then((res) => {
    res.json();
    if (res.status === 200) item.remove();
  });
};

const addTodoToDom = (todo) => {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.appendChild(document.createTextNode(todo.title));
  todoDiv.setAttribute("data-id", todo.id);

  document.getElementById("todo-list").appendChild(todoDiv);
};

const markDone = (e) => {
  if (e.target.classList.contains("todo")) e.target.classList.toggle("done");

  const updated = e.target;
  updateTodo({ id: updated.dataset.id, completed: updated.classList.contains("done") });
};

const init = () => {
  document.addEventListener("DOMContentLoaded", getTodos);
  document.getElementById("todo-list").addEventListener("click", markDone);
  document.getElementById("todo-list").addEventListener("dblclick", deleteTodo);
  document.getElementById("todo-form").addEventListener("submit", createTodo);
};
init();
