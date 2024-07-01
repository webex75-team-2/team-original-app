import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts"), {
      title: title,
      content: content,
    });

    setTitle("");
    setContent("");

    navigate("/postIndex");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <button type="submit">投稿する</button>
    </form>
  );
}
