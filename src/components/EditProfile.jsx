import { useRef, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { UserRound } from "lucide-react";

const EditProfile = ({ user }) => {
  const email = user.email;
  const fileRef = useRef(null);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle photo upload
  const onPhotoChange = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setPhotoUrl(String(e.target?.result || ""));
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

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName: lastName || "",
          password,
          age,
          gender,
          skills,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
      if (error.status === 401) {
        return navigate("/login");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center bg-base-300 mb-17">
        <div className="min-h-screen flex items-center justify-center p-4 ">
          <div className="card w-full max-w-4xl bg-base-100 shadow-xl rounded-2xl">
            <h2 className="card-title text-2xl pl-4 pt-2">Edit Profile</h2>
            <div className="card-body flex justify-center items-center">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Profile preview" />
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
                  {photoUrl && (
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => setPhotoUrl("")}
                    >
                      <CloseIcon fontSize="small" /> Remove
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-row items-center">
                {/* Left: Photo */}

                {/* Right: Form */}
                <form
                  className="overflow-y-auto max-h-[520px] pr-2"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text">First name </span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
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
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="e.g. Sharma"
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Password </span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
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
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
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
                      {skills?.map((s) => (
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
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      rows={4}
                      placeholder="Tell something about yourself"
                      className="textarea textarea-bordered w-full"
                    ></textarea>
                  </div>

                  <div className="flex gap-3 mt-6 justify-center">
                    <button type="submit" className="btn btn-primary">
                      <SaveIcon fontSize="small" /> Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <UserCard user={{firstName, lastName,email, password, photoUrl, age, gender, skills, about}}/>
      </div>
    </>
  );
};

export default EditProfile;
