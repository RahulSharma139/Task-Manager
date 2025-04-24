import React, { useState, FormEvent } from "react";
import { FaEdit, FaTrash, FaCheck, FaPlus, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import Layout from "../elements/layout";

// Task type
interface Task {
  id: number;
  name: string;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Create login page" },
    { id: 2, name: "Connect to backend" },
    { id: 3, name: "Setup MongoDB" },
  ]);

  const [newTaskName, setNewTaskName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");

  // Add Task
  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskName.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      name: newTaskName.trim(),
    };

    setTasks([newTask, ...tasks]);
    setNewTaskName("");
  };

  // Edit Task
  const handleEdit = (task: Task): void => {
    setEditTaskId(task.id);
    setEditName(task.name);
  };

  // Save Edited Task
  const handleSave = (taskId: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, name: editName } : task
      )
    );
    setEditTaskId(null);
  };

  // Delete Task
  const handleDelete = (taskId: number): void => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Toggle Sorting
  const toggleSort = (): void => {
    setIsAsc(!isAsc);
  };

  // Filtered & Sorted Tasks
  const displayedTasks = tasks
    .filter((task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      isAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <Layout>
      <div className="overflow-x-auto mt-10 p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Task Manager</h2>

        {/* Add Task */}
        <form onSubmit={handleAddTask} className="flex gap-4 mb-4">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Enter new task"
            className="border px-3 py-2 w-full rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </form>

        {/* Search + Sort */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="border px-3 py-2 w-full rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={toggleSort}
            className="ml-4 text-blue-600 hover:text-blue-800"
            title="Toggle Sort"
          >
            {isAsc ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
          </button>
        </div>

        {/* Table */}
        <table className="min-w-full border border-gray-300 shadow rounded-md">
          <thead>
            <tr className="bg-gray-200 ">
              <th className="p-3 text-left">Task Name</th>
              <th className="py-3 pr-6 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedTasks.map((task) => (
              <tr key={task.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  {editTaskId === task.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    task.name
                  )}
                </td>
                <td className="p-3 flex gap-4 justify-end">
                  {editTaskId === task.id ? (
                    <button
                      onClick={() => handleSave(task.id)}
                      className="text-green-600 hover:text-green-800"
                      aria-label="Save task"
                    >
                      <FaCheck />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-white bg-green-700 flex items-center px-3 hover:text-blue-800"
                      aria-label="Edit task"
                    >
                      <FaEdit />
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-white bg-red-600 flex items-center px-3 hover:text-red-800"
                    aria-label="Delete task"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {displayedTasks.length === 0 && (
              <tr>
                <td colSpan={2} className="p-3 text-center text-gray-500">
                  No matching tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default TaskTable;
