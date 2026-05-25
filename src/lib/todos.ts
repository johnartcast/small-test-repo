import { promises as fs } from "fs";
import path from "path";

export type Todo = { id: string; text: string; done: boolean };

const todosPath = path.join(process.cwd(), "data", "todos.json");

export async function getTodos(): Promise<Todo[]> {
  const raw = await fs.readFile(todosPath, "utf-8");
  return JSON.parse(raw) as Todo[];
}

export async function writeTodos(todos: Todo[]): Promise<void> {
  await fs.writeFile(todosPath, JSON.stringify(todos, null, 2) + "\n", "utf-8");
}
