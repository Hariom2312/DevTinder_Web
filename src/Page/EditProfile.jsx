import { useEffect, useRef, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const user = useSelector((store) => store.user);
  const fileRef = useRef(null);
  const [preview, setPreview] = useState("");
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    age: "",
    gender: "",
    about: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load user from backend on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));

        setForm({
          firstName: res.data?.data?.firstName || "",
          lastName: res.data?.data?.lastName || "",
          password: "",
          age: res.data?.data?.age || "",
          gender: res.data?.data?.gender || "",
          about: res.data?.data?.about || "",
        });
        setSkills(res.data?.data?.skills || []);
        setPreview(res.data?.data?.photoUrl || "");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      }
    };

    fetchUser();
  }, [dispatch,navigate]);

  // Handle photo upload
  const onPhotoChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(String(e.target?.result || ""));
    reader.readAsDataURL(file);
  };

  // Handle skills
  const addSkill = (value) => {
    const v = value.trim();
    if (!v || skills.includes(v)) return;
    setSkills([...skills, v]);
  };

  const removeSkill = (value) => setSkills(skills.filter((x) => x !== value));

  const handleSkillKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName: form.firstName,
      lastName: form?.lastName,
      password: form.password,
      photoUrl: preview || undefined,
      gender: form.gender,
      age: form.age,
      about: form.about,
      skills,
    };

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { data },
        { withCredentials: true }
      );
      toast.success(res.data.message);

      // Update redux with new data
      dispatch(addUser(res.data));

      // Redirect back to profile
      return navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      if (error.status === 401) {
        return navigate("/login");
      }
    }
  };

  // Reset form
  const handleReset = () => {
    setForm({
      firstName: user?.data?.firstName || "",
      lastName: user?.data?.lastName || "",
      password: "",
      age: user?.data?.age || "",
      gender: user?.data?.gender || "",
      about: user?.data?.about || "",
    });
    setSkills(user?.data?.skills || []);
    setPreview(user?.data?.photoUrl || "");
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 mb-20">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl rounded-2xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Edit Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 mt-4">
            {/* Left: Photo */}
            <div className="flex flex-col items-center gap-4">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {preview ? (
                    <img src={preview} alt="Profile preview" />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-500">
                      IMG
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => fileRef.current?.click()}
                >
                  <AddPhotoAlternateIcon fontSize="small" /> Upload
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPhotoChange(e.target.files?.[0])}
                />
                {preview && (
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => setPreview("")}
                  >
                    <CloseIcon fontSize="small" /> Remove
                  </button>
                )}
              </div>
            </div>

            {/* Right: Form */}
            <form
              className="overflow-y-auto max-h-[520px] pr-2"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">First name *</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Priya"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Last name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Sharma"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="label">
                    <span className="label-text">Password *</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    min={18}
                    max={60}
                    placeholder="e.g. 22"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="label">
                  <span className="label-text">Skills</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {skills.map((s) => (
                    <div key={s} className="badge badge-outline gap-1">
                      {s}
                      <button type="button" onClick={() => removeSkill(s)}>
                        <CloseIcon fontSize="inherit" />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Type a skill and press Enter"
                  onKeyDown={handleSkillKey}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="mt-4">
                <label className="label">
                  <span className="label-text">About</span>
                </label>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell something about yourself"
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="submit" className="btn btn-primary">
                  <SaveIcon fontSize="small" /> Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleReset}
                >
                  <RestartAltIcon fontSize="small" /> Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

