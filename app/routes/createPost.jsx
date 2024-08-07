import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Link } from "@remix-run/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../styles/design.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();

  const category = [
    { value: "kousoku", label: "#校則" },
    { value: "bukatsu", label: "#部活" },
    { value: "shinro", label: "#進路" },
    { value: "kadai", label: "#課題" },
    { value: "other", label: "その他" },
  ];

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || content.trim() === "" || !selectedCategory) {
      alert("全ての項目を入力してください。");
      return;
    }

    if (!uid) {
      alert("ユーザーがログインしていません。");
      return;
    }

    await addDoc(collection(db, "posts"), {
      title: title,
      content: content,
      category: selectedCategory ? selectedCategory.label : "",
      uid: uid,
      createdAt: serverTimestamp(),
      likeCount: 0,
    });

    setTitle("");
    setContent("");
    setSelectedCategory(null);

    navigate("/postIndex");
  };

  return (
    <header className="CreatePostPage-header2">
      <h1>新規投稿</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">タイトル：</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="内容：ex)　校則"
          className="radious"
        />

        <label htmlFor="content">本文:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="内容：ex) 頭髪規定が厳しい！！"
          className="radious"
        />

        <label htmlFor="category">カテゴリ:</label>
        <Select
          id="category"
          options={category}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="選択."
          className="color"
        />

        <button type="submit">投稿する</button>
      </form>

      <Link to="/postIndex" className="page-change">
        投稿一覧
      </Link>
      <Link to="/ranking" className="page-change">
        ランキング
      </Link>
      <aside className="related-posts">
        <h3>関連投稿</h3>
        <ul>
          <section id="instructions">
            <h2>投稿の手順</h2>
            <ol>
              <li>1, 投稿画面へ移動します。</li>
              <li>
                2, ①タイトル,
                ②内容を入力し、③カテゴリを選択します。④「投稿」ボタンをクリックします。
              </li>
              <li>3, 投稿が表示されます。</li>
            </ol>
          </section>
        </ul>
      </aside>
    </header>
  );
}
