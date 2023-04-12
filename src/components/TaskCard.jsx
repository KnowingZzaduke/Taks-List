import { FaCalendarCheck, FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { FaEdit } from "react-icons/fa";
export function TaskCard({ task }) {
  const { deleteTask, confirmTask } = useContext(TaskContext);
  const { bringData} = useContext(TaskContext);
  return (
    <div className="content_task">
      <div className="info" key={task.id}>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
      </div>
      <div className="options_buttons">
        <FaCalendarCheck onClick={() => confirmTask(task.id)} />
        <FaTrashAlt onClick={() => deleteTask(task.id)} />
        <FaEdit onClick={() => bringData(task.id)}/>
      </div>
    </div>
  );
}
