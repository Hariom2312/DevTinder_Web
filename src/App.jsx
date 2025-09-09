import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Profile from "./Page/Profile";
import Login from "./Page/Login";
import ForgotPassword from "./Page/ForgotPassword";
import NewPassword from "./Page/NewPassword";
import Feed from "./Page/Feed";
import { ToastContainer } from "react-toastify";

import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Request from "./Page/Request";
import Friends from "./Page/Friends";
import Signup from "./Page/Signup";
import Premium from "./Page/Premium";
import Chat from "./Page/Chat";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            {/* Children of Body */}
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/request" element={<Request />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
            <Route path="/premium" element={<Premium />} />
          </Route>

          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/new_password/:token" element={<NewPassword />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        toastOptions={{
          success: {
            duration: 1000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </Provider>
  );
}

export default App;
