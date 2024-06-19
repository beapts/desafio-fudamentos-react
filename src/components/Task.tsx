import { Trash } from 'phosphor-react';
import styles from './Task.module.css'


interface TaskList{
    id: string
    title: string;
    done: boolean;
    onDeleteTask: (id: string) => void;
    onTaskUpdate: (id: string) => void;
  }

export function Task( {id, title, done, onDeleteTask, onTaskUpdate}: TaskList ){

    function deleteTask(){
        onDeleteTask(id);
    }

    function updateTask(){
        onTaskUpdate(id);
    }
    return(

        <div className={styles.task}>
            <div className={styles.taskInfo}> 
                <input type='radio' 
                defaultChecked={done} 
                className={styles.customRadio}
                onChange={updateTask}></input>
                <p> {title} </p>  
            </div>
            
            <button className={styles.trashButton} onClick={deleteTask}>
                <Trash size={22} />
            </button>
        </div>
            
    );
}