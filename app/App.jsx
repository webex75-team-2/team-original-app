import { collection, addDoc, getDocs } from "firebase/firestore";
// firebase.js で db として export したものを import
import { db } from "./firebase";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "tweets")).then((snapshot) => {
      const newTweets = [];
      snapshot.forEach((doc) => {
        newTweets.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTweets(newTweets);
    });
  }, []);

  const postTweet = () => {
    const tweet = {
      text: "こんにちは、ツイートの本文です。",
    };
    addDoc(collection(db, "tweets"), {
      ...tweet,
    }).then((ref) => {
      const newTweets = [...tweets];
      newTweets.push({
        id: ref.id,
        ...tweet,
      });
      setTweets(newTweets);
    });
  };

  return (
    <div>
      <button onClick={postTweet}>ツイート</button>
      <div>
        {tweets.map((tweet) => (
          <p key={tweet.id}>{tweet.text}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
