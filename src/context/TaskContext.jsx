import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [task, setTask] = useState([]);
  function createTask(titleTask, descriptionTask) {
    setTask([...task, {
      id: task.length,
      title: titleTask,
      description: descriptionTask
    }]);
  }

  function deleteTask(Idtask) {
    setTask(task.filter((tks) => tks.id !== tks.Idtask));
  }

  function confirmTask(Idtask) {
    setTask(task.filter((tks) => tks.id !== tks.Idtask));
  }
  return (
    <TaskContext.Provider
      value={{
        task,
        createTask,
        deleteTask,
        confirmTask,
      }}
    >{props.children}</TaskContext.Provider>
  );
}
