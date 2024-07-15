import { Link } from "@remix-run/react";
import Login from "../components/Login";
import "../styles/design.css";

export const meta = () => {
  return [
    { title: "高校生向け匿名サイト" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div
      className="LoginPage"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    >
      <header className="LoginPage-header">
        <h1>高校生向け匿名サイト</h1>
        <Login />
        <ul>
          <li>
            <Link to="/createPost" className="page-change">
              投稿画面へ
            </Link>
          </li>
          <li>
            <Link to="/postIndex" className="page-change">
              投稿一覧へ
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
