import { useRef } from "react";
import { useContext } from "react";
import { PostList } from "../store/post-list-store";
import { Form, redirect, useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const userId = useRef();
  const postTitle = useRef();
  const postBody = useRef();
  const postReaction = useRef();
  const tags = useRef();

  // const { addPost } = useContext(PostList);

  //this code work befor used action of react router in main and bottom of this code
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const newPost = {
  //     title: postTitle.current.value,
  //     body: postBody.current.value,
  //     tags: tags.current.value.split(" "),
  //     reactions: {
  //       likes: postReaction.current.value,
  //       dislikes: postReaction.current.value,
  //     },
  //     userID: userId.current.value,
  //   };

  //   //we can also move this logic inside post list store component
  //   fetch("https://dummyjson.com/posts/add", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       title: postTitle.current.value,
  //       body: postBody.current.value,
  //       tags: tags.current.value.split(" "),
  //       reactions: {
  //         likes: postReaction.current.value,
  //         dislikes: postReaction.current.value,
  //       },
  //       userId: userId.current.value,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       addPost(data);
  //       navigate("/");
  //     });

  //   console.log(newPost);

  //   postTitle.current.value = "";
  //   postBody.current.value = "";
  //   tags.current.value = "";
  //   postReaction.current.value = "";
  //   userId.current.value = "";

  //   // addPost(newPost);
  // };

  return (
    <Form /*form this is changed by Form of react-router-dom*/
      method="post"
      className="create-post" /*onSubmit={handleSubmit} not required to action react router its used befor it*/
    >
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your user id
        </label>
        <input
          ref={userId} //ref not required with action of react router
          name="userId" //{/**this name is used by action of react-router-dom to submit data */}
          type="text"
          className="form-control"
          id="userId"
          placeholder="Your User ID"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title
        </label>
        <input
          ref={postTitle}
          name="title"
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter Title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content
        </label>
        <textarea
          ref={postBody}
          name="body"
          type="text"
          rows="4"
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reaction" className="form-label">
          No Of Reaction
        </label>
        <input
          ref={postReaction}
          name="reactions"
          type="text"
          className="form-control"
          id="reaction"
          placeholder="How many people reacted?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your Hashtags here
        </label>
        <input
          ref={tags}
          name="tags"
          type="text"
          className="form-control"
          id="tags"
          placeholder="Please Enter tags using space"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </Form>
  );
}
//here just log the data of action result - is our server resposne with new data then we can use ✅ OPTION 1 — Use useRevalidator() to refresh posts list after redirect (BEST) - but here we have used dummyjson api
// export async function createPostAction(data) {
//   const formData = await data.request.formData(); //this is async method so need to used then or async await
//   const postData = Object.fromEntries(formData);
//   postData.tags = postData.tags.split(" ");
//   postData.reactions = {
//     likes: postData.reactions,
//     dislikes: postData.reactions,
//   };
//   console.log(postData);
//   fetch("https://dummyjson.com/posts/add", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(postData),
//     //working -  body: JSON.stringify({
//     //   title: postData.title,
//     //   body: postData.body,
//     //   tags: postData.tags,
//     //   reactions: {
//     //     likes: postData.reactions,
//     //     dislikes: postData.reactions,
//     //   },
//     //   userId: postData.userId,
//     // }),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     });
//   return redirect("/");
// }

export async function createPostAction(data) {
  const formData = await data.request.formData();
  const postData = Object.fromEntries(formData);

  postData.tags = postData.tags.split(" ");
  postData.reactions = {
    likes: postData.reactions,
    dislikes: postData.reactions,
  };

  const response = await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  const newPost = await response.json();
  console.log(newPost);
  //here work pending no data reflate in postlist

  // send action data back
  return redirect("/");
}

export default CreatePost;
