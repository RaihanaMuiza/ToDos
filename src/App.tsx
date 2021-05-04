import React,{FC, ChangeEvent, useState} from 'react';
import './App.css';
import ToDoTask from './Components/TodoTask';
import {ITask} from './Interfaces';
import { DatePicker,PageHeader } from 'antd';
import 'antd/dist/antd.css';

const App:FC = () => {
  const [task,setTask] = useState<string>("");
  const [deadline,setDeadline] = useState<number>(0);
  const [completeStatus, setCompleteStatus] = useState<boolean>(false);
  const [todoList,setTodoList] = useState<ITask[]>([]);

  const handleChange = (event : ChangeEvent<HTMLInputElement>) : void => {
    if(event.target.name === "task"){
      setTask(event.target.value);
    }
    // else{
    //   setDeadline(Number(event.target.value));
    // }
    setTask(event.target.value);
  };

  const addTask = () : void => {
    const newTask = {taskName : task, deadline:deadline};
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  }

  const completeTask = (taskNameToDelete : string) : void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName != taskNameToDelete
    }))
  }


  return (
    <div className="App">
     <div className='title'>ToDos!</div>
     <div className="header">
       <div className="inputFields">
       <input 
       name="task"
       type="text" 
       value={task}
       placeholder="Enter your task here" 
       onChange={handleChange} 
      />

       {/* <input 
       name="deadline"
       type="number" 
       value={deadline}
       placeholder="Deadline in days" 
       onChange={handleChange} 
       /> */}
       </div>
       <button onClick={addTask}>Add Task</button>
     </div>
     <span className="datePicker">
         {<DatePicker />}
        </span>

     <div className="todoList">
       {todoList.map((task : ITask, key : number) => {
          return <ToDoTask key={key} task={task} completeTask={completeTask}/>
       })}
     </div>
    </div>
  );
}

export default App;
