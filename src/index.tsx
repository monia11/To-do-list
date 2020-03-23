import React, { Fragment, useState } from 'react';
import ReactDOM, { render } from 'react-dom';

type TaskForm = React.FormEvent<HTMLFormElement>;

interface ITask {
  text: string;
  complete: boolean;
  important: boolean;
  setTime: string;
}

export default function App(): JSX.Element {
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);
  const handleSubmit = (e: TaskForm): void => {
    e.preventDefault();
    addTask(value);
    setValue('');
  };

  const addTask = (text: string): void => {
    const newTask: ITask[] = [
      ...tasks,
      {
        text,
        complete: false,
        important: false,
        setTime: time()
      }
    ];
    setTasks(newTask);
  };

  const time = (): string => {
    return new Date().toLocaleString();
  };
  const completeTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[index].complete = !newTasks[index].complete;
    setTasks(newTasks);
  };

  const removeTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const highlight = (index: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[index].important = !newTasks[index].important;

    setTasks(newTasks);
  };

  return (
    <div className="container">
    <div className = "header">
    <h1 className = "title">To-Do List </h1>
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="What do you want to do?"
              value={value}
              onChange={e => setValue(e.target.value)}
              required
            />
            <button type="submit">✍ </button>
          </form>

    </div>
       

        <div className="list">
         
            {tasks.map((task: ITask, index: number) => (
              <Fragment key={index}>
                <div className = "todo__text"
                  style={{
                    fontWeight: task.important ? 'bold' : 'normal',
                    color: task.complete ? 'grey' : ''
                  }}
                >
                  {task.text}
                  <div className="time">Added: {task.setTime} </div>
                <div className="time">
                  {task.complete ? `Finished  ${time()}` : ''}
                </div>
                
                 
                </div>

                <div className= "buttons">

                <button type="button" onClick={() => completeTask(index)}>
                  Done {task.complete ? '☑' : '☐'}
                </button>

                <button type="button" onClick={() => highlight(index)}>
                  Important{task.important ? '❗' : '❕'}
                </button>
                <button type="button" onClick={() => removeTask(index)}>
                  ✖
                </button>
                </div>
              
                
          
              </Fragment>
            ))}
        
        </div>
      
    </div>
  );
}

const root = document.getElementById('root');

ReactDOM.render(<App />, root);
