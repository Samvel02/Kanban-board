import { LIST_COPY, LIST_TYPES } from '../../config';
import List from '../List/List';
import uniqid from 'uniqid';

const Main = ({ tasks, setTasks }) => {
  const addNewTask = (title) => {
    const newTask = {
      id: uniqid(),
      title,
      description: '',
      created: new Date().toISOString(),
      status: LIST_TYPES.BACKLOG,
    }
    setTasks([...tasks, newTask])
  }

  return (
    <>
      {
        Object.values(LIST_TYPES).map((type) => {
          const listTasks = tasks.filter(task => task.status === type)
          const prevTaskList =
            tasks.filter(task => task.status === Object.values(LIST_TYPES)[(Object.values(LIST_TYPES).indexOf(type) - 1)]);
          const prevListName = Object.values(LIST_TYPES)[(Object.values(LIST_TYPES).indexOf(type) - 1)]
          return (
            <List
              key={type}
              type={type}
              title={LIST_COPY[type]}
              allTasks={tasks}
              tasks={listTasks}
              addNewTask={addNewTask}
              setTasks={setTasks}
              prevTaskList={prevTaskList}
              prevListName={prevListName}
            />
          )
        })
      }
    </>
  );
}

export default Main;