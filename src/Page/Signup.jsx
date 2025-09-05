import { useState } from "react";
import axios from "axios";
import SignupImg from "../assets/signup.webp";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  
  const navigate = useNavigate();
  const [eye, setEye] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All filed Required !!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password not correct ...");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          email,
          password,
          firstName,
          lastName,
          age,
          gender,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res.data.data));
      return navigate("/");
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      setError(error?.response?.data?.message || "Signup failed ❌");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen mb-12 bg-[url(./assets/bg2.jpg)] bg-no-repeat bg-cover bg-center">
      <div className=" min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="hidden lg:block text-center lg:text-left ">
            <h1 className="text-3xl text-center text-bold mb-2">Sign up</h1>
            <img
              src={SignupImg}
              className=" rounded-xl lg:w-130 w-full h-full object-cover mix-blend-color-burn brightness-100 contrast-125"
            />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="text-xl text-cyan-700 text-center lg:hidden">
                Signup
              </h1>
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                  <label className="label">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <label className="label">Email ID *</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="label">Password *</label>
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
                  <label className="label">Confirm Password</label>
                  <div className="flex justify-between">
                    <input
                      type={eye ? "password" : "text"}
                      name="password"
                      className="input"
                      placeholder="Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div
                      onClick={() => setEye(!eye)}
                      className="flex items-center"
                    >
                      {eye ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </div>
                    
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text mb-2">Age</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={age}
                      onChange={(e)=>setAge(e.target.value)}
                      min={18}
                      max={60}
                      placeholder="e.g. 22"
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="pt-2">
                <label className="label mb-1">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e)=>setGender(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

      
                  {error ? (
                    <p className="text-[16px] text-red-500 text-center">
                      {error}
                    </p>
                  ) : (
                    ""
                  )}

                 {loading && (
                    <div className="flex justify-center mt-2">
                      <span className="loading loading-spinner loading-xl "></span>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn bg-orange-500 mt-4 font-bold rounded-full"
                  >
                    Submit
                  </button>

                    <Link
                      to="/login"
                      className="link link-hover text-center pt-2"
                    >
                      <span className="text-lg opacity-80">
                        Already have an account? Login Here
                      </span>
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

export default Signup;
