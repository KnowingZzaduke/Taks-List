import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [task, setTask] = useState([]);
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState();
  function createTask(titleTask, descriptionTask) {
    const newTask = {
      id: uuidv4(),
      title: titleTask,
      description: descriptionTask,
      completed: "false",
    };
    setTask([...task, newTask]);
    setCount(count + 1);
  }

  useEffect(() => {
    const getTask = localStorage.getItem("tarea");
    const parseTask = JSON.parse(getTask);
    if (parseTask) {
      setTask(parseTask);
    }
  }, []);

  useEffect(() => {
    const getCount = Number(localStorage.getItem("contador"));
    if(getCount){
      setCount(getCount)
    }
  }, []);

  useEffect(() => {
    const getCompleted = Number(localStorage.getItem("completado"));
    if(getCompleted){
      setCompleted(getCompleted);
    }
  }, []);

  useEffect(() => { 
    localStorage.setItem("tarea", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    localStorage.setItem("contador", count);
  }, [count]);

  useEffect(() => {
    localStorage.setItem("completado", completed);
  }, [completed])

  function openModal() {
    setModal(!modal);
  }

  function bringData(Idtask) {
    task.find((tsk) => {
      if (tsk.id === Idtask) {
        setModal(!modal);
        setTitle(tsk.title);
        setDescription(tsk.description);
        setId(Idtask);
      }
    });
  }

  function updateData(titleTask, descriptionTask) {
    setTask(task.map((tsk) => {
      if(tsk.id === id){
        return {...tsk, title: titleTask, description: descriptionTask}
      }
      return tsk
    }))
  }

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
        setCount(count > 0 ? count -1 : 0);
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
          setCompleted(completed + 1);
          setCount(count > 0 ? count -1 : 0);
          setTask(task.filter((tsk) => tsk.id !== Idtask));
          if (completed === true) {
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
        completed,
        modal,
        title,
        description,
        createTask,
        deleteTask,
        confirmTask,
        openModal,
        bringData,
        updateData,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
