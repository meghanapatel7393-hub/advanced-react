import "./App.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
// import Sidebar from "../components/Sidebar"; without routes setup
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";
import { useState } from "react";
import PostListProvider from "../store/post-list-store";
import { Outlet } from "react-router-dom";
import SidebarNew from "../components/SidebarNew";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    <PostListProvider>
      <div className="app-container">
        {/* <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} /> */}
        <SidebarNew /> {/*new side bar that manage by router*/}
        <div className="content">
          <Header />
          {/* {selectedTab === "Home" ? <PostList /> : <CreatePost />} */}
          <Outlet />
          {/**without this routes setup not work */}
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
