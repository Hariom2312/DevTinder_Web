import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-bold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen mb-20">
      <div className="card bg-base-200 shadow-xl w-96">
        <figure className="px-6 pt-6">
          <img
            src={user.photoUrl}
            alt="User profile"
            className="rounded-xl w-90 h-100 object-cover"
          />
        </figure>

        <div className="card-body items-center text-center">
          <h2 className="card-title">
            {user.firstName} {user.lastName || ""}
          </h2>
          {user.email && <p className="text-gray-600">Email : {user.email}</p> }
          <p className="mt-2">{user.about}</p>
          <div className="flex justify-between items-center gap-10">
            <span className="mt-2">Age : {user.age}</span>
            <span className="mt-2">Gender : {user.gender}</span>
          </div>
          {user?.skills?.length > 0 && (
            <div className="mt-2">
              <h3 className="font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {user?.skills?.length > 0 &&
                  user?.skills?.map((skill, index) => (
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
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
