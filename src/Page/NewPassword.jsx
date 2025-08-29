import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate ,useParams} from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const NewPassword = () => {
  const {token} = useParams('');
  const [password, setPassword] = useState("Radha@2002");
  const [confirmPassword, setConfirmPassword] = useState("Radha@2002");
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password Not Match...");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.put(
         BASE_URL + "/new_password/"+ token,
        {
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      navigate("/login");
      toast.success("Password Update Successfully...");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update Password");
    } finally{
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center w-100% h-[550px]">
        <fieldset className="fieldset w-[300px]">
          <legend className="fieldset-legend text-xl text-center mb-1">
            New Password
          </legend>
          <input
            type="text"
            className="input"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <legend className="fieldset-legend text-xl text-center mb-1 pl-10">
            Confirm New Password
          </legend>
          <input
            type="text"
            className="input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="flex justify-center mt-4">
            <button onClick={handleSubmit} className="btn btn-wide ">
              Submit
            </button>
            {
            loading && (
             <span class="loading loading-spinner loading-xl"></span>
            )
           }
          </div>
        </fieldset>
      </div>
    </>
  );
};
export default NewPassword;
