import { FaCalendarCheck, FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
export function TaskCard(task) {
  const { deletetask, confirmtask } = useContext(TaskContext);

  return (
    <div className="content_task">
      <div className="info">
        <h2>{task.title}</h2>
        <p>{task.description}</p>
      </div>
      <div className="options_buttons">
        <FaCalendarCheck onClick={() => confirmtask()}/>
        <FaTrashAlt onClick={() => deletetask()}/>
      </div>
    </div>
  );
}
