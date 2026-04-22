import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import axios from "axios";
import toast from "react-hot-toast";

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        const data = res.data;
        const fetchedNotes = Array.isArray(data) ? data : data?.notes ?? [];

        setNotes(fetchedNotes);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error?.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("An error occurred while fetching notes.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        {isRateLimited && <RateLimitedUI />}
        <div className="max-w-7xl mx-auto p-4 mt-6">
          {loading && (
            <div className="text-center text-primary py-10">Loading notes...</div>
          )}
          {notes.length > 0 && isRateLimited === false && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <div>
                  {note.title} | {note.content}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
