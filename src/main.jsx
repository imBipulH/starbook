import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
// eslint-disable-next-line no-unused-vars
import firebaseConfig from "./authentication/firebaseConfig";
import { Provider } from "react-redux";
import Login from "./pages/Login/Login.jsx";
import Registration from "./pages/Registration/Registration.jsx";
import store from "./store.jsx";
import Home from "./pages/Home/Home.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Chatbox from "./pages/Message/Chatbox.jsx";
import Users from "./pages/Users/Users.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/chatbox",
    element: <Chatbox />,
  },
  {
    path: '/users',
    element: <Users/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
