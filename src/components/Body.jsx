import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async()=>{
   try {
    const res = await axios.get(BASE_URL + "/profile/view" ,{withCredentials:true});
    console.log(res.data);
    dispatch(addUser(res.data));
   } catch (error) {
    if(error.status === 401) {
       return navigate('/login');
    }
   }
  }

  useEffect(()=>{
    fetchUser();
  })

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
};

export default Body;
