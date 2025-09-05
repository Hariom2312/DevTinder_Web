import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      if(user) return;
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      // console.log("Body Fetch User:",res.data);
      dispatch(addUser(res.data.data));
    } catch (error) {
      if (error.status === 401) {
        return navigate("/login");
      }
      // console.log("Error in Body:", error?.response?.data?.message);
    }
  };

  useEffect(() => {
       fetchUser();
  },[user]);

  return (
    <>
      <Navbar user={user}/>
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
