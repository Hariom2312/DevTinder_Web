import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

      setSuccess("Send Email Successfully ✅");
      console.log(res.data);
    } catch (error) {
      if (error.status === 404) {
        return navigate("/signup");
      }
      console.error(error);
      setError("Failed to send a email ❌");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center w-100% min-h-screen bg-[url(./assets/email.jpg)] bg-no-repeat bg-cover bg-center">
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
          {loading && (
            <div className="flex justify-center mt-2">
              {" "}
              <span className="loading loading-spinner loading-xl "></span>
            </div>
          )}
          {success && (
            <div className="mt-2 text-green-700 text-[16px] font-bold text-center">
              {success}
            </div>
          )}
          {error && (
            <div className="mt-2 text-red-700 text-[16px] font-bold text-center">
              {error}
            </div>
          )}
          <div className="flex justify-center ">
            <button
              onClick={handleSubmit}
              className="w-full btn bg-orange-500 mt-4 font-bold rounded-3xl"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default ForgotPassword;
