import { useState, FormEvent, ChangeEvent } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';
// import RocketLogo from './assets/rocket.svg';
// import ToDoLogo from './assets/todo.svg';

import { Header } from "./components/Header.tsx";
import { Task } from "./components/Task.tsx";
import styles from './App.module.css';
import { v4 as uuidv4 } from 'uuid';
import './styles.css';
import { PlusCircle, ClipboardText } from 'phosphor-react';

function App() {
  interface ITask {
    id: string;
    title: string;
    done: boolean;
  }

  const [taskList, setTaskList] = useState<ITask[]>([
    {
      id: uuidv4(),
      title: "Modelo de Task para adicionar no projeto",
      done: true,
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  function InputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value);
  }

  function addTask(event: FormEvent) {
    event.preventDefault();

    if (newTaskTitle.trim() === '') {
      return;
    }

    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      done: false,
    };

    setTaskList([...taskList, newTask]);
    setNewTaskTitle(''); 
  }

  function deleteTask(taskId: string){
    const taskNew = taskList.filter(task => {
        return (task.id !== taskId);
    })
    setTaskList(taskNew);
  }

  function updateTask(taskId: string){
    const updatedTaskList = taskList.map(task => {
      if (task.id === taskId) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  }

  return (
    <div>
      <Header />
      <form className={styles.form} onSubmit={addTask}>
        <input
          className={styles.inputTask}
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTaskTitle}
          onChange={InputChange}
          required
        />
        <button type="submit">
          Criar
          <PlusCircle size={27} />
        </button>
      </form>

      <main>
        <div className={styles.infos}>
          <h4 className={styles.createdTasks}>
            Tarefas Criadas <span>{taskList.length}</span>
          </h4>
          <h4 className={styles.doneTasks}>
            Tarefas Concluídas <span>{taskList.filter(task => task.done).length} de {taskList.length}</span>
          </h4>
        </div>
        <div>
          {taskList.length == 0 ? (
            <div className={styles.none}>
              <ClipboardText size={70} />
              <h3> Você ainda não tem tarefas cadastradas </h3>
              <h4> Crie tarefas e organize seus itens a fazer </h4>
            </div>
          ) : 
          (taskList.map((task) => {
            return (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                done={task.done}
                onDeleteTask={deleteTask}
                onTaskUpdate={updateTask}
              />
            );
          }))}
          
        </div>
      </main>
    </div>
  );
}

export default App;
