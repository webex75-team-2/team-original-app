import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CreatePost from "../routes/createPost.jsx";
import postindex from "../routes/postIndex.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user] = useAuthState(auth);

  return (
    <>
      {user ? (
        <>
          <UserInfo />
          <Signoutbutton />
        </>
      ) : (
        <Signinbutton />
      )}
    </>
  );
}
function Signinbutton() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };
  return <button onClick={signInWithGoogle}>サインイン</button>;
}
function Signoutbutton() {
  return <button onClick={() => auth.signOut()}>サインアウト</button>;
}
function UserInfo() {
  return (
    <div className="userinfo">
      <img src={auth.currentUser.photoURL} alt=""></img>
      <p>{auth.currentUser.displayName}</p>
    </div>
  );
}
export default Login;
