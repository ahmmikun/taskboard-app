import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { api } from "../lib/api";

export default function CreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    try {
      setSubmitting(true);
      await api.post("/notes", {
        title: title.trim(),
        content: content.trim(),
      });
      toast.success("Note created successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
      const message =
        error?.response?.data?.message || "Failed to create note. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 mt-6">
        <div className="card bg-base-300 border border-base-content/10 shadow-md">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-primary">Create Note</h1>
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Task</legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter task"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  maxLength={120}
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Content</legend>
                <textarea
                  className="textarea textarea-bordered w-full h-40"
                  placeholder="Write your note here..."
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  maxLength={5000}
                  required
                />
              </fieldset>

              <button
                type="submit"
                className={`btn btn-primary ${submitting ? "btn-disabled" : ""}`}
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Create Note"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
