"use server";

import { revalidatePath } from "next/cache";
import { getTodos, writeTodos } from "@/lib/todos";

export async function addTodo(formData: FormData) {
  const text = String(formData.get("text") ?? "").trim();
  if (!text) return;
  const todos = await getTodos();
  todos.push({ id: crypto.randomUUID(), text, done: false });
  await writeTodos(todos);
  revalidatePath("/todos");
}

export async function toggleTodo(id: string) {
  const todos = await getTodos();
  const next = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  await writeTodos(next);
  revalidatePath("/todos");
}

export async function deleteTodo(id: string) {
  const todos = await getTodos();
  await writeTodos(todos.filter((t) => t.id !== id));
  revalidatePath("/todos");
}
