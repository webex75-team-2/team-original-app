import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/design.css";

export default function DeleteButton({ postId }) {
  const handleDelete = async () => {
    const docRef = doc(db, "posts", postId);
    try {
      await deleteDoc(docRef);
      window.location.reload();
    } catch (error) {
      console.error("削除できませんでした", error);
    }
  };

  return <button onClick={handleDelete}>削除</button>;
}
