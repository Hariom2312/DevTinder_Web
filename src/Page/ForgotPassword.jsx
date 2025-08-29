import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";


const ForgotPassword = () => {

  const [loading , setLoading] = useState(false);
  const [email , setEmail] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/forgot_password",
        {
          email,
        },
        { withCredentials: true }
      );
      
      toast.success("Send Email Successfully...");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send a email");
    } finally{
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center w-100% h-[550px]">
        <fieldset className="fieldset w-[300px]">
          <legend className="fieldset-legend text-xl text-center mb-1">
            Enter your Email ID
          </legend>
          <input
            type="text"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;
