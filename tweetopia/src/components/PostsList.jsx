import { useLoaderData } from "react-router-dom";
import Post from "./Post";
import classes from "./PostsList.module.css";

function PostsList() {
  const posts = useLoaderData();

  return (
    <>
      {posts?.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={post.author}
              body={post.body}
            />
          ))}
        </ul>
      )}
      {posts?.length === 0 && (
        <div style={{ textAlign: "center" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some! 😉</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
