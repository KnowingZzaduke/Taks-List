import { TaskContext } from "../context/TaskContext";
import { TaskCard } from "./TaskCard";
import { useContext } from "react";
export function TaskList() {
  const { task } = useContext(TaskContext);
  return (
    <div className="content_all-task">
      {task.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
