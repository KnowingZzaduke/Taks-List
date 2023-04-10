import { TaskContext } from "../context/TaskContext";
import { TaskCard } from "./TaskCard";
import { useContext } from "react";
export function TaskList() {
  const { task } = useContext(TaskContext);
  console.log(task)

  return (
    <div className="content_all-task">
      {task.map((tsk) => (
        <TaskCard key={tsk.id} task={tsk} />
      ))}
    </div>
  );
}
