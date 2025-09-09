import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { clearFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connectionSlice";
import { clearRequest } from "../utils/requestSlice";

const Navbar = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(clearFeed());
      dispatch(removeUser());
      dispatch(removeConnections());
      dispatch(clearRequest());

      return navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error("Error in logout ...");
    }
  };

  return (
    <div className="flex py-2 shadow-sm bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👨‍💻 DevTinder
        </Link>
      </div>
 
      {user && (
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
                      user.photoUrl
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
                <Link to="/premium">premium</Link>
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
      )}
    </div>
  );
};

export default Navbar;
