import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";

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
      return navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error("Error in logout");
    }
  };

  return (
    <div className="navbar shadow-sm bg-base-300 ">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👨‍💻 DevTinder
        </Link>
      </div>
 
      {user ? (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mr-5">
            <div className="flex items-center gap-2">
              <p>Welcome, {user.firstName}</p>{" "}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user photo"
                    src={
                      user.photoUrl ||
                      "https://imgs.search.brave.com/tSeEr9hhQ8HTygpEwWkKnVG7h78lc7FKg0t6lKOjQzU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3Ivc2lsdmVyLW1l/bWJlcnNoaXAtaWNv/bi1kZWZhdWx0LWF2/YXRhci1wcm9maWxl/LWljb24tbWVtYmVy/c2hpcC1pY29uLXNv/Y2lhbC1tZWRpYS11/c2VyLWltYWdlLXZl/Y3Rvci1pbGx1c3Ry/YXRpb25fNTYxMTU4/LTQxOTUuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw"
                    }
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/">Feed</Link>
              </li>
              <li>
                <Link to="/request">request</Link>
              </li>
              <li>
                <Link to="/friends">friends</Link>
              </li>
              <li>
                <Link onClick={Logout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button className="btn bg-zinc-700 text-white border-black mr-5 rounded-xl ">
          <Link to="/login">👉 Login Here</Link>
        </button>
      )}
    </div>
  );
};

export default Navbar;
