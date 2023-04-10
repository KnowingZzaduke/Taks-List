import { Form } from "./components/Form";
import { TaskList } from "./components/TaskList";
export function App() {
  return (
    <div className="content_all">
      <Form />
      <TaskList />
    </div>
  );
}
