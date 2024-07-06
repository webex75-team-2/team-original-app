import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Link } from "@remix-run/react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const category = [
    { value: "kousoku", label: "#校則" },
    { value: "bukatsu", label: "#部活" },
    { value: "shinro", label: "#進路" },
    { value: "kadai", label: "#課題" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts"), {
      title: title,
      content: content,
      category: selectedCategory ? selectedCategory.label : "カテゴリなし",
    });

    setTitle("");
    setContent("");
    setSelectedCategory(null);

    navigate("/postIndex");
  };

  return (
    <>
      <h1>新規投稿</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">タイトル：</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">本文:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label htmlFor="category">カテゴリ:</label>
        <Select
          id="category"
          options={category}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />

        <button type="submit">投稿する</button>
      </form>

      <Link to="/postIndex">投稿一覧</Link>
    </>
  );
}
