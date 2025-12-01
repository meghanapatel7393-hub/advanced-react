import { useContext, useEffect, useState } from "react";
import WelcomeMessage from "./WelcomeMessage";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import LoadingSpinner from "./LoadingSpinner";
import { useLoaderData, useLocation } from "react-router-dom";

export default function PostList() {
  //this code working fine befor use routing loader code -
  // const { postList, addInitialPosts, fetching } = useContext(PostListData); replace by below to learn loader data calling
  const postList = useLoaderData();

  const handleGetPostsClick = () => {
    //https://jsonplaceholder.typicode.com/posts
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => {
        addInitialPosts(data.posts);
      });
  };

  return (
    <>
      {/* this code working fine befor use routing loader code -  {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && (
        <WelcomeMessage onGetPostsClick={handleGetPostsClick} />
      )}
      {!fetching && postList.map((post) => <Post key={post.id} post={post} />)} */}
      {/* {fetching && <LoadingSpinner />} */}
      {postList.length === 0 && (
        <WelcomeMessage onGetPostsClick={handleGetPostsClick} />
      )}
      {postList.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export const postLoader = () => {
  return fetch("https://dummyjson.com/posts")
    .then((response) => response.json())
    .then((data) => {
      return data.posts;
    });

  return;
};
