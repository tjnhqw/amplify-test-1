import './App.css';
import { DataStore } from "@aws-amplify/datastore";
import { Todo } from './models';

function App() {
  async function getTodos() {
    const models = await DataStore.query(Todo);
    console.log(models);
    return models;
  }
  async function addTodo() {
    await DataStore.save(
      new Todo({
        "name": "Lorem ipsum dolor sit amet",
        "description": "Lorem ipsum dolor sit amet"
      })
    );
  }
  async function updateTodo(id: string) {
    const original = await DataStore.query(Todo, id);

    await DataStore.save(Todo.copyOf(original!, item => {
      // Update the values on {item} variable to update DataStore entry
      item.name = `title ${Date.now()}`
    }));
  }
  async function deleteTodo(id: string) {
    const modelToDelete = await DataStore.query(Todo, id);
    DataStore.delete(modelToDelete!);

  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={addTodo}>Add</button>
        <button onClick={getTodos}>Get todos</button>
        <button onClick={() => updateTodo('06a97f9d-914a-48fc-9269-58a6a2f5a581')}>Update todo</button>
      </header>
    </div>
  );
}

export default App;
