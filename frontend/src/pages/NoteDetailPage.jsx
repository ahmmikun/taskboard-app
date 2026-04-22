import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { api } from "../lib/api";

export default function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await api.get(`/notes/${id}`);
        setTitle(data.title || "");
        setContent(data.content || "");
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error(error?.response?.data?.message || "Failed to load note.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    try {
      setUpdating(true);
      await api.put(`/notes/${id}`, {
        title: title.trim(),
        content: content.trim(),
      });
      toast.success("Note updated successfully.");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error(error?.response?.data?.message || "Failed to update note.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this note permanently?");
    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error(error?.response?.data?.message || "Failed to delete note.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-3xl mx-auto p-4 mt-6 text-center text-primary">
          Loading note...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 mt-6">
        <div className="card bg-base-300 border border-base-content/10 shadow-md">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-primary">Edit Note</h1>
              <Link to="/" className="btn btn-ghost btn-sm">
                Back
              </Link>
            </div>

            <form className="space-y-4 mt-4" onSubmit={handleUpdate}>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Title</legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
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
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  maxLength={5000}
                  required
                />
              </fieldset>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className={`btn btn-primary ${updating ? "btn-disabled" : ""}`}
                  disabled={updating || deleting}
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  className={`btn btn-error ${deleting ? "btn-disabled" : ""}`}
                  onClick={handleDelete}
                  disabled={deleting || updating}
                >
                  {deleting ? "Deleting..." : "Delete Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
