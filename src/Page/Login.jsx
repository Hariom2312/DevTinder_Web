import { useState } from "react";
import axios from "axios";
import LoginImg from "../assets/loginPage.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [eye, setEye] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are Required !!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res.data);

      const { token } = res.data;
      localStorage.setItem("token", token);
      dispatch(addUser(res.data.data));
      return navigate("/");
    } catch (error) {
      console.log(error?.res?.data || error.message);
      setError("Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url(./assets/bg2.jpg)] bg-no-repeat bg-cover bg-center">
      <div className="min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl text-center text-bold mb-2">Login Now!</h1>
            <img
              src={LoginImg}
              className="hidden lg:block rounded-xl w-50 lg:w-130 h-auto"
            />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                  <label className="label">Email ID</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="label">Password</label>
                  <div className="flex justify-between">
                    <input
                      type={eye ? "password" : "text"}
                      name="password"
                      className="input"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      onClick={() => setEye(!eye)}
                      className="flex items-center"
                    >
                      {eye ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </div>
                  </div>
                    <Link to="/forgot_password" className="link link-hover">
                      Forgot password?
                    </Link>
                  {loading && (
                    <div className="flex justify-center mt-2">
                      {" "}
                      <span className="loading loading-spinner loading-xl "></span>
                    </div>
                  )}
                  {error ? (
                    <p className="text-[16px] text-red-500 text-center">
                      {error}
                    </p>
                  ) : (
                    ""
                  )}
                  <button
                    type="submit"
                    className="btn bg-orange-500 mt-4 font-bold rounded-full"
                  >
                    Login
                  </button>
                   <Link to="/signup" className="link link-hover text-center text-lg pt-4">
                      New User? Signup here
                    </Link>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
