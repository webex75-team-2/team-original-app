import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  deleteDoc,
  doc,
  getDoc,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../styles/design.css";

export function LikeButton({ postId, ranking }) {
  const userId = auth.currentUser?.uid;

  const [isLiked, setIsLiked] = useState(null);

  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const postRef = doc(db, "posts", postId);
    const likedUserRef = doc(postRef, "LikedUsers", userId);

    const unsubscribeLikedUser = onSnapshot(likedUserRef, (doc) => {
      setIsLiked(doc.exists());
    });

    getDoc(postRef).then((doc) => {
      if (doc.exists()) {
        setLikeCount(doc.data().likeCount || 0);
      }
    });

    const unsubscribeLikedCount = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        setLikeCount(doc.data().likeCount || 0);
      }
    });

    return () => {
      unsubscribeLikedUser();
      unsubscribeLikedCount();
    };
  }, [userId, postId]);

  const handleClick = useCallback(async () => {
    if (!userId || isLiked === null) return;
    const postRef = doc(db, "posts", postId);

    const likedUserRef = doc(db, "posts", postId, "LikedUsers", userId);

    const userLikePostRef = doc(db, "users", userId, "likePosts", postId);
    if (isLiked) {
      await deleteDoc(likedUserRef);
      await deleteDoc(userLikePostRef);
      await updateDoc(postRef, { likeCount: increment(-1) });
    } else {
      await setDoc(likedUserRef, { userId });
      await setDoc(userLikePostRef, { postId });
      await updateDoc(postRef, { likeCount: increment(1) });
    }

    if (ranking === "true") {
      window.location.reload();
    }
  }, [userId, postId, isLiked, ranking]);

  if (!userId) return null;
  if (isLiked === null) return null;

  return (
    <div>
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={faHeart} color={isLiked ? "red" : "grey"} />
        <p>{likeCount}</p>
      </button>
    </div>
  );
}
