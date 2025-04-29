// import React, { useState, FormEvent } from "react";
// import {
//   FaEdit,
//   FaTrash,
//   FaCheck,
//   FaPlus,
//   FaSortAlphaDown,
//   FaSortAlphaUp,
// } from "react-icons/fa";
// import Layout from "../elements/layout";

// interface Task {
//   name: string;
//   tag: string;
//   time: string;
// }

// const TaskTable: React.FC = () => {
//   const [tasks, setTasks] = useState<Task[]>([
//     {
//       name: "Create login page",
//       tag: "Urgent",
//       time: "2025-04-21 10:00",
//     },
//     {
//       name: "Connect to backend",
//       tag: "Medium",
//       time: "2025-04-22 12:30",
//     },
//     {
//       name: "Setup MongoDB",
//       tag: "Low",
//       time: "2025-04-23 14:00",
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newTaskName, setNewTaskName] = useState("");
//   const [newTaskTag, setNewTaskTag] = useState("");
//   const [newTaskTime, setNewTaskTime] = useState("");

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterTag, setFilterTag] = useState("");
//   const [filterTime, setFilterTime] = useState("");
//   const [isAsc, setIsAsc] = useState(true);
//   const [editTaskIndex, setEditTaskIndex] = useState<number | null>(null);
//   const [editName, setEditName] = useState("");

//   const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!newTaskName.trim() || !newTaskTag.trim() || !newTaskTime.trim())
//       return;

//     const newTask: Task = {
//       name: newTaskName.trim(),
//       tag: newTaskTag.trim(),
//       time: newTaskTime.trim(),
//     };

//     setTasks([newTask, ...tasks]);
//     setNewTaskName("");
//     setNewTaskTag("");
//     setNewTaskTime("");
//     setIsModalOpen(false);
//   };

//   const handleEdit = (index: number): void => {
//     setEditTaskIndex(index);
//     setEditName(tasks[index].name);
//   };

//   const handleSave = (index: number): void => {
//     const updatedTasks = [...tasks];
//     updatedTasks[index].name = editName;
//     setTasks(updatedTasks);
//     setEditTaskIndex(null);
//   };

//   const handleDelete = (index: number): void => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };

//   const toggleSort = (): void => {
//     setIsAsc(!isAsc);
//   };

//   const displayedTasks = tasks
//     .filter(
//       (task) =>
//         task.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//         task.tag.toLowerCase().includes(filterTag.toLowerCase()) &&
//         task.time.toLowerCase().includes(filterTime.toLowerCase())
//     )
//     .sort((a, b) =>
//       isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
//     );

//   return (
//     <Layout>
//       <div className="bg-gradient-to-r from-[#213448] to-stone-900  min-h-screen py-10 text-white">
//         <div className="max-w-7xl mx-auto transform transition-all duration-300 ease-out scale-95 animate-fade-in ">
//           <h2 className="text-xl font-semibold text-white mb-4">
//             Task Manager
//           </h2>

//           {/* Add Button */}
//           <div className="flex justify-end mb-4">
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
//             >
//               <FaPlus /> Add Task
//             </button>
//           </div>

//           {/* Filters */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search name"
//               className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black"
//             />
//             <input
//               type="text"
//               value={filterTag}
//               onChange={(e) => setFilterTag(e.target.value)}
//               placeholder="Filter by Tag"
//               className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black"
//             />
//             <input
//               type="text"
//               value={filterTime}
//               onChange={(e) => setFilterTime(e.target.value)}
//               placeholder="Filter by Time"
//               className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black"
//             />
//           </div>

//           {/* Sort Toggle */}
//           <div className="flex justify-end mb-4">
//             <button
//               onClick={toggleSort}
//               className="text-blue-300 hover:text-blue-500"
//               title="Toggle Sort"
//             >
//               {isAsc ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
//             </button>
//           </div>

//           {/* Table */}
//           <table className="min-w-full border border-gray-300 shadow rounded-md">
//             <thead className="text-black bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">#</th>
//                 <th className="p-3 text-left">Task Name</th>
//                 <th className="p-3 text-left">Tag</th>
//                 <th className="p-3 text-left">Time</th>
//                 <th className="p-3 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {displayedTasks.length > 0 ? (
//                 displayedTasks.map((task, index) => (
//                   <tr key={index} className="border-t hover:bg-gray-700">
//                     <td className="p-3">{index + 1}</td>
//                     <td className="p-3">
//                       {editTaskIndex === index ? (
//                         <input
//                           type="text"
//                           value={editName}
//                           onChange={(e) => setEditName(e.target.value)}
//                           className="border rounded px-2 py-1 w-full text-black"
//                         />
//                       ) : (
//                         task.name
//                       )}
//                     </td>
//                     <td className="p-3">{task.tag}</td>
//                     <td className="p-3">{task.time}</td>
//                     <td className="p-3 flex justify-end gap-2">
//                       {editTaskIndex === index ? (
//                         <button
//                           onClick={() => handleSave(index)}
//                           className="text-green-400 hover:text-green-600"
//                         >
//                           <FaCheck />
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleEdit(index)}
//                           className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-2"
//                         >
//                           <FaEdit /> Edit
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleDelete(index)}
//                         className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-2"
//                       >
//                         <FaTrash /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="p-3 text-center text-white">
//                     No matching tasks found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition-opacity duration-300 ease-in-out">
//             <div className="bg-white rounded-lg p-6 max-w-md w-full text-black transform transition-all duration-300 ease-out scale-95 animate-fade-in">
//               <h3 className="text-xl font-bold mb-4">Add New Task</h3>
//               <form onSubmit={handleAddTask} className="space-y-4">
//                 <input
//                   type="text"
//                   value={newTaskName}
//                   onChange={(e) => setNewTaskName(e.target.value)}
//                   placeholder="Task Name"
//                   className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
//                 />
//                 <input
//                   type="text"
//                   value={newTaskTag}
//                   onChange={(e) => setNewTaskTag(e.target.value)}
//                   placeholder="Tag (e.g., Urgent)"
//                   className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
//                 />
//                 <input
//                   type="text"
//                   value={newTaskTime}
//                   onChange={(e) => setNewTaskTime(e.target.value)}
//                   placeholder="Time (e.g., 2025-04-25 15:30)"
//                   className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
//                 />
//                 <div className="flex justify-end gap-2">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                   >
//                     Add Task
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default TaskTable;

import React, { useState, FormEvent } from "react";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaPlus,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";
import Layout from "../elements/layout";

interface Task {
  name: string;
  tag: string;
  time: string;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      name: "Create login page",
      tag: "Urgent",
      time: "2025-04-21 10:00",
    },
    {
      name: "Connect to backend",
      tag: "Medium",
      time: "2025-04-22 12:30",
    },
    {
      name: "Setup MongoDB",
      tag: "Low",
      time: "2025-04-23 14:00",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskTag, setNewTaskTag] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [isAsc, setIsAsc] = useState(true);
  const [editTaskIndex, setEditTaskIndex] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskName.trim() || !newTaskTag.trim() || !newTaskTime.trim())
      return;

    const newTask: Task = {
      name: newTaskName.trim(),
      tag: newTaskTag.trim(),
      time: newTaskTime.trim(),
    };

    setTasks([newTask, ...tasks]);
    setNewTaskName("");
    setNewTaskTag("");
    setNewTaskTime("");
    setIsModalOpen(false);
  };

  const handleEdit = (index: number): void => {
    setEditTaskIndex(index);
    setEditName(tasks[index].name);
  };

  const handleSave = (index: number): void => {
    const updatedTasks = [...tasks];
    updatedTasks[index].name = editName;
    setTasks(updatedTasks);
    setEditTaskIndex(null);
  };

  const handleDelete = (index: number): void => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleSort = (): void => {
    setIsAsc(!isAsc);
  };

  const displayedTasks = tasks
    .filter(
      (task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        task.tag.toLowerCase().includes(filterTag.toLowerCase()) &&
        task.time.toLowerCase().includes(filterTime.toLowerCase())
    )
    .sort((a, b) =>
      isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

  return (
    <Layout>
      <div className="bg-gradient-to-r from-[#213448] to-stone-900 min-h-screen py-6 md:py-10 px-4 text-white">
        <div className="max-w-7xl mx-auto pl-20 transform transition-all duration-300 ease-out scale-95 animate-fade-in">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
            Task Manager
          </h2>

          {/* Add Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded hover:bg-green-700 flex items-center gap-1 md:gap-2 text-sm md:text-base"
            >
              <FaPlus /> Add Task
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 md:mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name"
              className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-sm md:text-base"
            />
            <input
              type="text"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              placeholder="Filter by Tag"
              className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-sm md:text-base"
            />
            <input
              type="text"
              value={filterTime}
              onChange={(e) => setFilterTime(e.target.value)}
              placeholder="Filter by Time"
              className="border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none text-black text-sm md:text-base"
            />
          </div>

          {/* Sort Toggle */}
          <div className="flex justify-end mb-2 md:mb-4">
            <button
              onClick={toggleSort}
              className="text-blue-300 hover:text-blue-500 p-1"
              title="Toggle Sort"
            >
              {isAsc ? <FaSortAlphaDown size={18} /> : <FaSortAlphaUp size={18} />}
            </button>
          </div>

          {/* Table (Desktop) */}
          <div className="hidden md:block overflow-x-auto rounded-md">
            <table className="min-w-full border border-gray-300 shadow rounded-md">
              <thead className="text-black bg-gray-100">
                <tr>
                  <th className="p-2 md:p-3 text-left">#</th>
                  <th className="p-2 md:p-3 text-left">Task Name</th>
                  <th className="p-2 md:p-3 text-left">Tag</th>
                  <th className="p-2 md:p-3 text-left">Time</th>
                  <th className="p-2 md:p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedTasks.length > 0 ? (
                  displayedTasks.map((task, index) => (
                    <tr key={index} className="border-t hover:bg-gray-700">
                      <td className="p-2 md:p-3">{index + 1}</td>
                      <td className="p-2 md:p-3">
                        {editTaskIndex === index ? (
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border rounded px-2 py-1 w-full text-black"
                          />
                        ) : (
                          task.name
                        )}
                      </td>
                      <td className="p-2 md:p-3">{task.tag}</td>
                      <td className="p-2 md:p-3">{task.time}</td>
                      <td className="p-2 md:p-3 flex justify-end gap-2">
                        {editTaskIndex === index ? (
                          <button
                            onClick={() => handleSave(index)}
                            className="text-green-400 hover:text-green-600"
                          >
                            <FaCheck />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 flex items-center gap-1 text-sm"
                          >
                            <FaEdit /> Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 flex items-center gap-1 text-sm"
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-3 text-center text-white">
                      No matching tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Card List (Mobile) */}
          <div className="md:hidden space-y-4">
            {displayedTasks.length > 0 ? (
              displayedTasks.map((task, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      {editTaskIndex === index ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="border rounded px-2 py-1 w-full text-black"
                        />
                      ) : (
                        <h3 className="font-medium">{task.name}</h3>
                      )}
                    </div>
                    <div className="text-xs bg-blue-600 px-2 py-0.5 rounded ml-2">
                      {task.tag}
                    </div>
                  </div>
                  <div className="text-sm text-gray-300 mb-3">{task.time}</div>
                  <div className="flex justify-end gap-2">
                    {editTaskIndex === index ? (
                      <button
                        onClick={() => handleSave(index)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1 text-sm"
                      >
                        <FaCheck /> Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center gap-1 text-sm"
                      >
                        <FaEdit /> Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1 text-sm"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 bg-gray-800 rounded-lg">
                No matching tasks found.
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition-opacity duration-300 ease-in-out p-4">
            <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md text-black transform transition-all duration-300 ease-out scale-95 animate-fade-in">
              <h3 className="text-lg md:text-xl font-bold mb-4">Add New Task</h3>
              <form onSubmit={handleAddTask} className="space-y-4">
                <input
                  type="text"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  placeholder="Task Name"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  type="text"
                  value={newTaskTag}
                  onChange={(e) => setNewTaskTag(e.target.value)}
                  placeholder="Tag (e.g., Urgent)"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <input
                  type="text"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  placeholder="Time (e.g., 2025-04-25 15:30)"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-400 text-white rounded hover:bg-gray-600 text-sm md:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm md:text-base"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TaskTable;