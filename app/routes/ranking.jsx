import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { LikeButton } from "../components/likebutton";
import { Link } from "@remix-run/react";
import DeleteButton from "../components/deleteButton";
import "../styles/design.css";

export default function GetPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("likeCount", "desc"));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  const assignRanks = (posts) => {
    let rank = 1;
    let lastLikeCount = null;
    let rankOffset = 0;

    return posts.map((post) => {
      if (lastLikeCount !== null && post.likeCount !== lastLikeCount) {
        rank += rankOffset + 1;
        rankOffset = 0;
      } else if (lastLikeCount !== null && post.likeCount === lastLikeCount) {
        rankOffset++;
      }

      lastLikeCount = post.likeCount;
      return { ...post, rank };
    });
  };

  const rankedPosts = assignRanks(posts);

  return (
    <div className="PostListPage">
      <header className="CreatePostPage-header">
        <h1>いいね数ランキング</h1>
        <Link to="/createPost" className="page-change">
          新規投稿
        </Link>
        <Link to="/postIndex" className="page-change">
          投稿一覧
        </Link>
      </header>
      <ul className="post-list">
        {rankedPosts.map((post) => (
          <li key={post.id} className="post">
            <h3>
              {post.rank}位: {post.title}
            </h3>
            <p>{post.content}</p>
            <p>{post.category || "カテゴリなし"}</p>
            {post.id && <LikeButton postId={post.id} ranking="true" />}
            {auth.currentUser && post.uid === auth.currentUser.uid && (
              <DeleteButton postId={post.id} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
