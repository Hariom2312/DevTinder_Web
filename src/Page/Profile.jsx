import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user); // from redux
  const navigate = useNavigate();
  
  useEffect(()=>{
    
  },[navigate,user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-bold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-200 shadow-xl w-96">
        <figure className="px-6 pt-6">
          <img
            src={
              user?.photoUrl ||
              "https://imgs.search.brave.com/tSeEr9hhQ8HTygpEwWkKnVG7h78lc7FKg0t6lKOjQzU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3Ivc2lsdmVyLW1l/bWJlcnNoaXAtaWNv/bi1kZWZhdWx0LWF2/YXRhci1wcm9maWxl/LWljb24tbWVtYmVy/c2hpcC1pY29uLXNv/Y2lhbC1tZWRpYS11/c2VyLWltYWdlLXZl/Y3Rvci1pbGx1c3Ry/YXRpb25fNTYxMTU4/LTQxOTUuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw"
            }
            alt="User profile"
            className="rounded-xl w-32 h-32 object-cover"
          />
        </figure>

        <div className="card-body items-center text-center">
          <h2 className="card-title">
            {user.firstName} {user?.lastName || ""}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="mt-2">{user.about || "No about info provided."}</p>

          {user.skills?.length > 0 && (
            <div className="mt-3">
              <h3 className="font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-primary badge-outline"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="card-actions mt-5 flex justify-evenly w-full">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/editprofile")}
            >
              ✏️ Edit Profile
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
