import { getTodos } from "@/lib/todos";
import { addTodo, toggleTodo, deleteTodo } from "./actions";

export const dynamic = "force-dynamic";

export default async function TodosPage() {
  const todos = await getTodos();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Todos</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Mutations go through Server Actions; state is persisted to{" "}
        <code>data/todos.json</code>.
      </p>
      <form action={addTodo} className="flex gap-2">
        <input
          name="text"
          placeholder="Add a todo…"
          className="flex-1 rounded border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        />
        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between rounded border border-gray-200 p-3 dark:border-gray-800"
          >
            <form action={toggleTodo.bind(null, t.id)}>
              <button
                className={
                  t.done
                    ? "text-left text-gray-500 line-through"
                    : "text-left"
                }
              >
                {t.text}
              </button>
            </form>
            <form action={deleteTodo.bind(null, t.id)}>
              <button className="text-sm text-red-600">Delete</button>
            </form>
          </li>
        ))}
        {todos.length === 0 && (
          <li className="text-gray-500">No todos yet.</li>
        )}
      </ul>
    </div>
  );
}
