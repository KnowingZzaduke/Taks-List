import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [task, setTask] = useState([]);
  const [count, setCount] = useState(0);
  const [complete, setCompleted] = useState(0);
  function createTask(titleTask, descriptionTask) {
    const newTask = {
      id: task.length,
      title: titleTask,
      description: descriptionTask,
      completed: "false",
    };
    setTask([...task, newTask]);
    setCount(count + 1);
  }

  useEffect(() => {
    localStorage.setItem("tarea", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    const getTask = localStorage.getItem("tarea");
    const parseTask = JSON.parse(getTask);
    if (parseTask) {
      setTask(parseTask);
    }
  }, []);

  function deleteTask(Idtask) {
    Swal.fire({
      title: "Alerta",
      text: "¿Desea eliminar la tarea?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        setTask(task.filter((tsk) => tsk.id !== Idtask));
        setCount(count - 1);
        Swal.fire({
          title: "Exito",
          text: "La tarea se ha eliminado correctamente",
          icon: "success",
        });
      }
    });
  }

  function confirmTask(Idtask) {
    const confirmed = (task.complete = true);
    if (confirmed) {
      Swal.fire({
        title: "Alerta",
        text: "¿Terminaste la tarea?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si terminé",
      }).then((result) => {
        if (result.isConfirmed) {
          setCompleted(complete + 1);
          setCount(count - 1);
          setTask(task.filter((tsk) => tsk.id !== Idtask));
          if (complete === true) {
            Swal.fire({
              title: "Alerta",
              text: "Ya has terminado esta tarea, puedes empezar otra tarea :)",
              icon: "warning",
            });
          }
        }
      });
    }
  }

  return (
    <TaskContext.Provider
      value={{
        task,
        count,
        complete,
        createTask,
        deleteTask,
        confirmTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
