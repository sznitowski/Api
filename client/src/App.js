import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/home/Home";
import Login from "./Pages/Users/Login/Login";
import List from "./Pages/list/List";
import New from "./Pages/new/New";
import Single from "./Pages/single/Single";
import { productInputs, userInputs } from "./formSource";

import Register from "./Pages/Users/Register/Register";
import Users from "./Pages/Users/Users";
//import Posts from "./Pages/post/Posts";

function App() {
  return (
    /*   <div className="app"> */
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/">
          <Route index element={<Home />} />
           <Route path="users">
            <Route index element={<List />} />
            <Route path=":userId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={userInputs} title="Add New User" />}
            />
          </Route> 
                 <Route path="/login" element={<Login />} />
        <Route path="/userList" element={<Users />} />
        <Route path="/register" element={<Register />} />
      {/*   <Route path="/posts" element={<Posts />} />  */}
          <Route path="products">
            <Route index element={<List />} />
            <Route path=":productId" element={<Single />} />
            <Route
              path="new"
              element={<New inputs={productInputs} title="Add New Product" />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    /*  </div> */
  );
}

export default App;
