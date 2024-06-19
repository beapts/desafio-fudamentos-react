import styles from './Header.module.css'
import RocketLogo from '../assets/rocket.svg'
import ToDoLogo from '../assets/todo.svg'



export function Header(){
    return(

        <div className={styles.divColor}>

            <div className={styles.logo}>
                <img src={RocketLogo} alt="logo" />
                <img src={ToDoLogo} alt="logo" />
            </div>
            
        </div>
     );
}