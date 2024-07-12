import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../styles/design.css";

export function LikeButton({ postId }) {
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

    const likedUsersRef = collection(db, `posts/${postId}/LikedUsers`);

    const unsubscribeLikedCount = onSnapshot(likedUsersRef, (snapshot) => {
      setLikeCount(snapshot.size);
    });

    return () => {
      unsubscribeLikedUser();
      unsubscribeLikedCount();
    };
  }, [userId, postId]);

  const handleClick = useCallback(async () => {
    if (!userId || isLiked === null) return;

    const likedUserRef = doc(db, "posts", postId, "LikedUsers", userId);

    const userLikePostRef = doc(db, "users", userId, "likePosts", postId);
    if (isLiked) {
      await deleteDoc(likedUserRef);
      await deleteDoc(userLikePostRef);
    } else {
      await setDoc(likedUserRef, { userId });
      await setDoc(userLikePostRef, { postId });
    }
  }, [userId, postId, isLiked]);

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
