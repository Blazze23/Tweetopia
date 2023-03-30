import { Link, Form, json, redirect } from "react-router-dom";
import Modal from "../components/Modal";
import { firebase_URL } from "../api/firebaseApi";
import classes from "./NewPost.module.css";

function NewPost() {
  return (
    <Modal>
      <Form className={classes.form} method="post">
        <div>
          <label htmlFor="body">Text</label>
          <textarea name="body" id="body" rows={3} required></textarea>
        </div>
        <div>
          <label htmlFor="author">Your Name</label>
          <input type="text" id="author" required name="author" />
        </div>
        <div className={classes.actions}>
          <Link to="..">Cancel</Link>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({ request }) {
  const formData = await request.formData();

  const postData = Object.fromEntries(formData);
  const response = await fetch(firebase_URL + "/posts.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw json({ message: "Could not create post" }, { status: 500 });
  } else {
    return redirect("/");
  }
}
