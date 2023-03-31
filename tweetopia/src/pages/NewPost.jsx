import {
  Link,
  Form,
  json,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";
import Modal from "../components/Modal";
import { firebase_URL } from "../api/firebaseApi";
import classes from "./NewPost.module.css";

function NewPost() {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Modal>
      <Form className={classes.form} method="post">
        <div>
          <label htmlFor="body">Tweet</label>
          <textarea name="body" id="body" rows={3} required></textarea>
        </div>
        {data?.error && <p style={{ color: "red" }}>{data?.error}</p>}
        <div>
          <label htmlFor="author">Your Name</label>
          <input type="text" id="author" required name="author" />
        </div>
        <div className={classes.actions}>
          <Link to="..">Cancel</Link>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Tweeting..." : "Tweet"}
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({ request }) {
  const formData = await request.formData();

  const postData = Object.fromEntries(formData);

  if (postData.body.length > 200) {
    return json({ error: "Tweet is limited to 200 characters" });
  }
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
