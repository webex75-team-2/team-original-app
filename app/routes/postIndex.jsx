import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { LikeButton } from "../components/likebutton";
import { Link } from "@remix-run/react";
import DeleteButton from "../components/deleteButton";
import "../styles/design.css";

export default function GetPosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value || "";
    if (selectedCategory === "") {
      setFilteredPosts(posts);
    } else {
      const filteredPosts = posts.filter(
        (post) => post.category === selectedCategory
      );
      setFilteredPosts(filteredPosts);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      setFilteredPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div className="PostListPage">
      <header className="CreatePostPage-header">
        <h1>投稿一覧</h1>
        <Link to="/createPost" className="page-change">
          新規投稿
        </Link>
        <Link to="/ranking" className="page-change">
          ランキング
        </Link>
        <select onChange={handleCategoryChange}>
          <option value="">すべてのカテゴリ</option>
          <option value="#校則">#校則</option>
          <option value="#部活">#部活</option>
          <option value="#進路">#進路</option>
          <option value="#課題">#課題</option>
          <option value="その他">その他</option>
        </select>
      </header>
      <ul className="post-list">
        {filteredPosts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>{post.category === "その他" ? "" : post.category}</p>
            {post.id && <LikeButton postId={post.id} ranking="false" />}
            {auth.currentUser && post.uid === auth.currentUser.uid && (
              <DeleteButton postId={post.id} />
            )}
          </li>
        ))}
      </ul>
      <aside className="related-posts">
        <h3>関連投稿</h3>
        <ul>
          <section id="instructions">
            <h2>投稿の手順</h2>
            <ol>
              <li>投稿画面へ移動します。</li>
              <li>タイトルと内容を入力します。</li>
              <li>「投稿」ボタンをクリックします。</li>
              <li>投稿が表示されます。</li>
            </ol>
          </section>
        </ul>
      </aside>
    </div>
  );
}
