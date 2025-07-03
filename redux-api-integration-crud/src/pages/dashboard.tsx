import { useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation, useUploadTodoMutation } from "../store/services/todoapi";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {

  const { data, isLoading } = useGetTodosQuery({});
  const [uploadDoc, { isLoading: isUploading }] = useUploadTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (selectedTodo) {
      console.log('Editing', selectedTodo);
      const response = await updateTodo({
        todo_id: selectedTodo.id,
        title: title,
        description: description
      });

      if (response) {
        toast.success("Todo updated successfully!");
      } else {
        toast.error("Failed to update todo!");
      }
    } else {
      const response = await uploadDoc({
        title,
        description,
      });

      if (response) {
        toast.success("Todo added successfully!");
      } else {
        toast.error("Failed to add todo!");
      }
    }
    setSelectedTodo(null);
    setTitle("");
    setDescription("");
  };

  const handleDelete = async (id: string) => { 
    const response = await deleteTodo(id);

    if (response) {
      toast.success("Todo deleted successfully!");
    }
  };

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  return (
    <div className="bg-violet-900 h-screen overflow-y-scroll">
      <MaxWidthWrapper>
        <div className="grid grid-cols-2">
          <div className="p-8">
            <h1 className="text-5xl font-bold text-violet-50">TODO WITH REDUX TOOLKIT</h1>
            <form
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 mt-10"
              onSubmit={e => {
                e.preventDefault();
                console.log({ title, description });
                handleSubmit();
              }}
            >
              <input
                type="text"
                placeholder="Title"
                className="px-4 py-2 rounded border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="px-4 py-2 rounded border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition resize-none"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
                required
              />
              <div className="flex gap-4">
                <button
                  type="button"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded transition"
                  onClick={() => {
                    setTitle("");
                    setDescription("");
                    setSelectedTodo(null);
                  }}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 rounded transition shadow"
                >
                  {/* {isUploading ? "Uploading..." : "Add"} */}
                  {selectedTodo ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
          <div className="p-8">
            <h2 className="text-5xl font-bold text-violet-50 text-center">Your Todos</h2>
              {isLoading ? (
                <div className="text-center text-violet-50 mt-10">Loading...</div>
              ) : (
                <div className="grid gap-6 mt-10">
                  {data && data.length > 0 ? (  
                    data.map((todo: any) => (
                      <div
                        key={todo.id}
                        className="bg-white rounded-lg shadow flex flex-col gap-2 p-6 border-l-4 border-violet-500 relative"
                      >
                        <h3 className="text-xl font-semibold text-violet-700">{todo.title}</h3>
                        <p className="text-gray-700">{todo.description}</p>
                        <div className="flex gap-3 mt-4">
                          <button
                            className="bg-violet-100 hover:bg-violet-200 text-violet-700 font-semibold px-4 py-1 rounded transition"
                            onClick={() => handleEdit(todo)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-4 py-1 rounded transition"
                            onClick={() => handleDelete(todo.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-green-700">No todos found.</div>
                  )}
                </div>
              )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default Dashboard