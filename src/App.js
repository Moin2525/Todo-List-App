import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [todolist, settodolist] = useState([]);
  const [newtask, setnewtask] = useState("");

  const change = (event) => {
    setnewtask(event.target.value);
  };

  const add = () => {
    const task = {
      id: todolist.length === 0 ? 1 : todolist[todolist.length - 1].id + 1,
      taskname: newtask,
      done: false,
    };
    settodolist([...todolist, task]);
  };

  const remove = (taskname) => {
    settodolist(todolist.filter((task) => task != taskname));
  };

  const done = (id) => {
    settodolist(
      todolist.map((task) => {
        if (task.id === id) {
          return { ...task, done: true };
        } else {
          return task;
        }
      })
    );
  };

  const [excuse, setexcuse] = useState("");
  const fetchExcuse = (excuse) => {
    Axios.get(`https://excuser-three.vercel.app/v1/excuse/${excuse}`).then((res)=>{
      setexcuse(res.data[0].excuse);
    })
  }

  return (
    <div className="App">
      <h1>TodoList App</h1>
      <div>
        <input onChange={change}></input>
        <button onClick={add}>Add Task</button>
        <div className="task">
          {todolist.map((task) => {
            return (
              <div className="todolist" style={{ backgroundColor: task.done ? "rgb(124, 252, 0)" : "white" }}>
                <h1 contentEditable>{task.taskname}</h1>
                <button className="done" onClick={() => done(task.id)}>Done</button>
                <button className="remove" onClick={() => remove(task)}>X</button>
              </div>
            );
          })}
        </div>
      </div><br></br><hr></hr>
      <h2>Wanna get rid of these task? &#128540; Make an excuse about: </h2>
      <button onClick={()=>fetchExcuse("party")}>Party</button>
      <button onClick={()=>fetchExcuse("family")}>Family</button>
      <button onClick={()=>fetchExcuse("office")}>Office</button>
      <br></br><p>{excuse}</p>
    </div>
  );
}

export default App;
