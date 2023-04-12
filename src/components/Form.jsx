import Swal from "sweetalert2";
import { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
export function Form() {
  const { createTask, count, completed } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || description === "") {
      Swal.fire({
        title: "Alerta",
        text: "¡Los campos están vacíos!",
        icon: "warning",
      });
    } else {
      createTask(title, description);
      setTitle("");
      setDescription("");
    }
  }
  return (
    <div className="content_form">
      <h1>Lista de tareas</h1>
      <div className="content_info">
        <div className="n_task">
          <h3>Número de tareas</h3>
          <span>{count}</span>
        </div>
        <div className="n_pending">
          <h3>Completadas</h3>
          <span>{completed}</span>
        </div>
      </div>
      <form>
        <div className="input">
          <label>Titulo</label>
          <input
            type="text"
            placeholder="Titulo la de tarea"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="input">
          <label>Descripción</label>
          <textarea
            placeholder="Descipción de la de tarea"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            style={{textAlign: "center"}}
          />
        </div>
        <div className="add_button">
          <button onClick={handleSubmit}>Agregar</button>
        </div>
      </form>
    </div>
  );
}
