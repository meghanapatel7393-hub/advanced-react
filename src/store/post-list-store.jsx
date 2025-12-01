import { createContext, useReducer, useState, useEffect } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  addInitialPosts: () => {},
  fetching: false,
});

const postListReducer = (currentPostList, action) => {
  let newPostList = currentPostList;

  if (action.type === "ADD") {
    newPostList = [action.payload, ...currentPostList];
    // newPostList = [
    //   ...currentPostList,
    //   {
    //     id: action.payload.id, //Date.now().toString(),
    //     title: action.payload.title,
    //     body: action.payload.body,
    //     tags: action.payload.tags, //action.payload.tags.split(" "),
    //     reactions: action.payload.reactions,
    //     userID: action.payload.userID,
    //   },
    // ];
  } else if (action.type === "DELETE") {
    newPostList = currentPostList.filter(
      (post) => post.id !== action.payload.id
    );
  } else if (action.type === "ADD_INITIAL_POST") {
    newPostList = [...action.payload.posts];
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [fetching, setFetching] = useState(false);

  //this method called only once after first render

  const addPost = (newPost) => {
    dispatchPostList({
      type: "ADD",
      payload: newPost, //this changed because server returns response in json
      // payload: {
      //   id: Math.random().toString(), //Date.now().toString()
      //   title: newPost.title,
      //   body: newPost.body,
      //   tags: newPost.tags,
      //   reactions: newPost.reactions,
      //   userID: newPost.userID,
      // },
    });
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POST",
      payload: {
        posts: posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE",
      // id: postId, or
      payload: {
        id: postId,
      },
    });
  };

  //its working fine but we have implement next method - data fetching using loader that code write in postlist and main
  // useEffect(() => {
  //   if (postList.length === 0) {
  //     //used to cancel request
  //     const controller = new AbortController();
  //     const signal = controller.signal;

  //     setFetching(true);
  //     fetch("https://dummyjson.com/posts", { signal })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         addInitialPosts(data.posts);
  //         setFetching(false);
  //       })
  //       .catch((err) => {
  //         if (err.name === "AbortError") {
  //           console.log("Fetch aborted");
  //           return; // ignore
  //         }
  //         console.error("Fetch error:", err); // actual error
  //       });

  //     //this is CleanUp function. used to remove side effects from component when it unmount. unmount means when component removed from DOM
  //     return () => {
  //       console.log("cleanup");
  //       controller.abort();
  //     };
  //   }
  // }, []);

  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    [] //DEFAULT_POST_LIST
  );

  return (
    <PostList.Provider
      value={{ postList, addPost, deletePost, addInitialPosts, fetching }}
    >
      {children}
    </PostList.Provider>
  );
};
const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: "Hi Friends, I am going to Mumbai for my vacations. Hope to enjoy a lot. Peace out.",
    reactions: {
      likes: 192,
      dislikes: 25,
    },
    userID: "1",
    tags: ["vacation", "Mumbai", "Enjoying", "Family"],
  },
  {
    id: "2",
    title: "Pass ho gye bhai",
    body: "4 saal ki masti k baad bhi ho gaye paas. hard to believe.",
    reactions: {
      likes: 192,
      dislikes: 25,
    },
    userID: "1",
    tags: ["Grace", "Passing", "Family"],
  },
];
export default PostListProvider;
