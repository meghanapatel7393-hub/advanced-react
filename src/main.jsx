import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./routes/App.jsx";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import CreatePost, { createPostAction } from "./components/CreatePost.jsx";
import PostList, { postLoader } from "./components/PostList.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import RootErrorBoundary from "./components/RootErrorBoundary.jsx";

//https://reactrouter.com/upgrading/v6
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PostList />,
        loader:
          postLoader /** https://reactrouter.com/docs/en/v6/getting-started/concepts this method is used to load data and comment in this project useEffect that work befor this */,
        HydrateFallback: () => <LoadingSpinner />,
      },
      {
        path: "/create-post",
        element: <CreatePost />,
        action: async (data) => createPostAction(data), //this is used to create post after form submit
        ErrorBoundary: (error) => <RootErrorBoundary />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
