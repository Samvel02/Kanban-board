import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LIST_TYPES } from '../../config';
import AddButton from '../AddButton/AddButton';
import FormAddTask from '../FormAddTask/FormAddTask';
import css from './List.module.css'

const List = ({ title, type, tasks, addNewTask, setTasks, prevTaskList }) => {
  const [addCard, setAddCard] = useState(false);

  const toggleAddCard = () => {
    setAddCard(!addCard);
  }
  const formSubmit = (title) => {
    addNewTask(title)
  }
  const changeStatus = (e, status) => {
    const tasksList = JSON.parse(window.localStorage.getItem('tasks'));
    const tasksCopy = tasksList.map((t) => {
      if (t.id === e.target.value) { t.status = status }
      return t
    });
    setTasks(tasksCopy);
    setAddCard(!addCard);
  }

  return (

      <div className={css.list}>
      <h2 className={css.list_title}>{title}</h2>
      {tasks.length === 0 && <p className={css.empty_list}>No tasks added yet</p>}
      {tasks.map(task => {
        return (
          <Link
            to={`/tasks/${task.id}`}
            className={css.link} key={task.id} >
            <div className={css.task_list_element}>{task.title}</div>
          </Link>
        )
      })}

      {addCard
        && type === LIST_TYPES.BACKLOG
        && <FormAddTask
          formSubmit={formSubmit}
          setAddCard={setAddCard} />}
      {!addCard
        && type === LIST_TYPES.BACKLOG
        && <button
          className={css.list_add_button}
          onClick={toggleAddCard}>Add card</button>}

      {addCard
        && type !== LIST_TYPES.BACKLOG
        &&
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setAddCard(false);
          }}
          className={css.option_form}>
          <select
            className={css.select}
            onChange={(e) => changeStatus(e, type)}
            defaultValue={"default"}>
            <option
              className={css.option}
              value={"default"}>Select task</option>
            {prevTaskList.map(task => {
              return <option
                className={css.option}
                key={task.id}
                value={task.id}>{task.title}</option>
            })}
          </select>
        </form>
      }

      {!addCard
        && type !== LIST_TYPES.BACKLOG
        && <AddButton
          className={css.list_add_button}
          addCard={addCard}
          setAddCard={setAddCard}
          toggleAddCard={toggleAddCard}
          prevTaskList={prevTaskList}
        >Add card </AddButton>}
    </div >
  );
}

export default List;