import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { api } from "../lib/api";

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchNotes = async () => {
    try {
      const { data } = await api.get("/notes");
      const fetchedNotes = Array.isArray(data) ? data : data?.notes ?? [];
      setNotes(fetchedNotes);
      setIsRateLimited(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (error?.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        setErrorMessage("Failed to load notes.");
        toast.error("An error occurred while fetching notes.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    const loadOnMount = async () => {
      try {
        const { data } = await api.get("/notes");
        if (!active) {
          return;
        }

        const fetchedNotes = Array.isArray(data) ? data : data?.notes ?? [];
        setNotes(fetchedNotes);
        setIsRateLimited(false);
      } catch (error) {
        if (!active) {
          return;
        }
        console.error("Error fetching notes:", error);
        if (error?.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          setErrorMessage("Failed to load notes.");
          toast.error("An error occurred while fetching notes.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadOnMount();

    return () => {
      active = false;
    };
  }, []);

  const handleRetry = async () => {
    setLoading(true);
    setErrorMessage("");
    await fetchNotes();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-6xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {!loading && errorMessage && !isRateLimited && (
          <div className="alert alert-error shadow-md flex justify-between items-center">
            <span>{errorMessage}</span>
            <button className="btn btn-sm btn-ghost" onClick={handleRetry}>
              Retry
            </button>
          </div>
        )}

        {!loading && !errorMessage && !isRateLimited && notes.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <p className="text-lg font-semibold">No notes yet</p>
            <p className="text-base-content/70">Create your first note to get started.</p>
            <Link to="/create" className="btn btn-primary">
              Create Note
            </Link>
          </div>
        )}

        {!loading && !isRateLimited && notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Link
                key={note._id}
                to={`/note/${note._id}`}
                className="card bg-base-300 border border-base-content/10 shadow-md hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="card-body">
                  <h3 className="card-title text-primary line-clamp-1">{note.title}</h3>
                  <p className="text-sm text-base-content/80 line-clamp-3">
                    {note.content}
                  </p>
                  <p className="text-xs text-base-content/50 pt-2">
                    Updated {new Date(note.updatedAt).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
