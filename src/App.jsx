import { Form } from "./components/Form";
import { TaskList } from "./components/TaskList";
import { Modal } from "./components/Modal";
export function App() {
  return (
    <div className="content_all">
      <Modal />
      <Form />
      <TaskList />
    </div>
  );
}
