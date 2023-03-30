import { json, useLoaderData } from "react-router-dom";
import { firebase_URL } from "../api/firebaseApi";
import Modal from "../components/Modal";
import classes from "./PostDetails.module.css";

function PostDetails() {
  const post = useLoaderData();

  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;

export async function loader({ params }) {
  const id = params.id;
  const response = await fetch(`${firebase_URL}/posts/${id}.json`);

  if (!response.ok) {
    throw json({ message: "Could not fetch post." }, { status: 500 });
  } else {
  }
  const postData = await response.json();
  const loadedPost = {
    id,
    ...postData,
  };
  return loadedPost;
}
