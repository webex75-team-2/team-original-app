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
    <div>
      <h1>投稿一覧</h1>
      <Link to="/createPost">新規投稿</Link>
      <ul>
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
    </div>
  );
}
