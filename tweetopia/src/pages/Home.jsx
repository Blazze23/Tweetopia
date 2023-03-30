import { json, Outlet } from "react-router-dom";
import PostsList from "../components/PostsList";
import { firebase_URL } from "../api/firebaseApi";

function Home() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Home;

export async function loader() {
  const response = await fetch(firebase_URL + "/posts.json");

  if (!response.ok) {
    throw json({ message: "Could not fetch posts" }, { status: 500 });
  } else {
    const data = await response.json();
    const loadedPosts = [];
    for (const postKey in data) {
      loadedPosts.push({
        id: postKey,
        author: data[postKey].author,
        body: data[postKey].body,
      });
    }
    return loadedPosts;
  }
}
