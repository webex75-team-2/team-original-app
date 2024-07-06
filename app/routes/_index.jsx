import { Link } from "@remix-run/react";
import Login from "../components/Login";

export const meta = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>高校生向け匿名サイト</h1>
      <Login />
      <ul>
        <li>
          <Link to="/createPost">投稿画面へ</Link>
        </li>
        <li>
          <Link to="/postIndex">投稿一覧へ</Link>
        </li>
      </ul>
    </div>
  );
}
