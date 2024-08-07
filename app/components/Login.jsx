import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth/dist/index.cjs";
import "../styles/design.css";

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
