import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    await addDoc(collection(db, "posts"), {
      title: title,
      content: content,
    });

    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <button type="submit">投稿する</button>
    </form>
  );
}
