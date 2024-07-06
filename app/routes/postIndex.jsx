import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { LikeButton } from "../components/likebutton";
import { Link } from "@remix-run/react";
import DeleteButton from "../components/deleteButton";

export default function GetPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
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
      </header>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>{post.category || "カテゴリなし"}</p>
            {post.id && <LikeButton postId={post.id} />}
            {post.id && <DeleteButton postId={post.id} />}
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
