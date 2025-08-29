import { useState } from "react";
import axios from "axios";
import LoginImg from "../assets/loginImg.jpg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("dhakadhariom007@gmail.com");
  const [password, setPassword] = useState("Radha@2002");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [eye, setEye] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All filed Required !");
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const { token } = res.data;
      localStorage.setItem("token", token);
      toast.success("Login Success ✅");
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (error) {
      console.log(error.res?.data || error.message);
      toast.error(error.res?.message || "Login failed ❌");
    }
  };

  return (
    <div className="h-[500px]">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
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
                    <div onClick={()=>setEye(!eye)} className="flex items-center">{eye ? <VisibilityIcon/> : <VisibilityOffIcon/>}</div>
                  </div>
                  <div>
                    <a href="/forgot_password" className="link link-hover">
                      Forgot password?
                    </a>
                  </div>
                  <button type="submit" className="btn btn-neutral mt-4">
                    Login
                  </button>
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
