import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "@remix-run/react";

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
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          display: "block",
          padding: "10px",
          margin: "10px 0",
          width: "80%",
          maxWidth: "400px",
        }}
        placeholder="内容：ex)　校則"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ marginTop: "2rem" }}
      />

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        投稿
      </button>
    </form>
  );
}
