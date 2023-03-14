import {
  Fragment,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

type TodoItem = {
  id: number;
  task: string;
  isDone: boolean;
};

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const finishedTasksCount = todos.filter((todo) => todo.isDone).length;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTask(e.target.value);

  const onAddTodo = () => {
    setTodos((todos) => [
      ...todos,
      { task, isDone: false, id: new Date().getTime() },
    ]);
    setTask("");
  };

  const onDelete = (id: number) => () => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const onToggleTask = (id: number) => () => {
    setTodos((todos) =>
      todos.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      })
    );
  };

  return (
    <>
      <input type="text" value={task} onChange={onChange} />
      <button type="button" onClick={onAddTodo}>
        Add Todo
      </button>

      <p>Finished Task Count: {finishedTasksCount}</p>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <button
              className=""
              style={{ backgroundColor: "red" }}
              onClick={onDelete(todo.id)}
            >
              x
            </button>{" "}
            <input
              type="checkbox"
              checked={todo.isDone}
              onChange={onToggleTask(todo.id)}
            />
            {todo.isDone ? <s>{todo.task}</s> : todo.task}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
