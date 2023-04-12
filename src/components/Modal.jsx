import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import { FaWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";
export function Modal() {
  const { modal, title, description, openModal, updateData} = useContext(TaskContext);
  const [titleUp, setTitleUp] = useState("");
  const [descriptionUp, setDescriptionUp] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if(titleUp === "" || descriptionUp === ""){
      setTitleUp(title);
      setDescriptionUp(description);
    }else{
      if(titleUp !== title || descriptionUp !== description){
        updateData(titleUp, descriptionUp);
        Swal.fire({
          title: "Exito",
          text: "Se ha modificado correctamente la tarea",
          icon: "success"
        })
      }
    }
  }

  useEffect(() => {
    setTitleUp(title);
    setDescriptionUp(description);
  }, [title, description]);

  return (
    <div className={`content_modal-n ${modal ? "content_modal-d" : ""}`}>
      <form>
        <div className="content_header">
          <h2>Formulario para editar</h2>
          <FaWindowClose onClick={openModal}/>
        </div>
        <div className="input">
          <label>Titulo</label>
          <input
            type="text"
            placeholder="Titulo la de tarea"
            onChange={(e) => setTitleUp(e.target.value)}
            value={titleUp}
            autoFocus
          />
        </div>
        <div className="input">
          <label>Descripción</label>
          <textarea
            placeholder="Descipción de la de tarea"
            onChange={(e) => setDescriptionUp(e.target.value)}
            value={descriptionUp}
          />
        </div>
        <div className="update_button">
          <button onClick={handleSubmit}>Actualizar</button>
        </div>
      </form>
    </div>
  );
}
