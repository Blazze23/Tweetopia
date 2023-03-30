import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home, { loader as postsLoader } from "./pages/Home";
import NewPost, { action as createPostAction } from "./pages/NewPost";
import "./index.css";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/Error";
import PostDetails, { loader as postDetailsLoader } from "./pages/PostDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: postsLoader,
        children: [
          {
            path: "/create-post",
            element: <NewPost />,
            action: createPostAction,
          },
          { path: ":id", element: <PostDetails />, loader: postDetailsLoader },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
