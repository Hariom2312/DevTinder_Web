import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  // console.log(user);
  const dispatch = useDispatch();

  const Logout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      // console.log(res);
      dispatch(removeUser(res.data));
      toast.success("Logout Success");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error("Error in logout");
    }
  };

  return (
    <div className="navbar shadow-sm bg-base-300 ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👨‍💻 DevTinder</a>
      </div>

      {user ? (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mr-5">
            <div className="flex items-center gap-2">
              <p>Welcome, {user.data.firstName}</p>{" "}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="user photo" src={user.data.photoUrl} />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={Logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button className="btn bg-zinc-700 text-white border-black mr-5 rounded-xl ">
          <a href="/login">👉 Login Here</a>
        </button>
      )}
    </div>
  );
};

export default Navbar;
