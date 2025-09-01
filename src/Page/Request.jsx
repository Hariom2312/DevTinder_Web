import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useSelector } from "react-redux";

const Request = () => {
  const [requestUser, setRequestUser] = useState([]);
  const user = useSelector((store) => store.user);

  async function handleRequest(userId, status) {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      toast.success(status);
      // remove that user from feed
      setRequestUser((prev) => prev.filter((u) => u._id !== userId));
    } catch (error) {
      console.log(`Error to send ${status} request`, error);
      toast.error(
        error?.response?.data?.message || `Failed to send ${status} request`
      );
    }
  }

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/pending_request", {
        withCredentials: true,
      });
      console.log("res", res);
      setRequestUser(res.data.data);
      console.log("requestUser", requestUser);
    } catch (error) {
      console.log("Error in Request Fetch", error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [user]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-8 mb-12">
      {requestUser.length === 0 ? (
        <div className="text-xl font-bold ">
          {user ? (
            <>
              No more users in feed ...
              {/* <span className="loading loading-dots loading-xl ml-2"></span> */}
            </>
          ) : (
            "Loading..."
          )}
        </div>
      ) : (
        requestUser.map((interestedUser) => (
          <div
            key={interestedUser._id}
            className="card bg-base-200 w-96 shadow-sm mb-8"
          >
            <figure>
              {interestedUser.fromUserId.photoUrl ? (
                <img
                  className="w-96 h-96 object-cover overflow-hidden"
                  src={interestedUser.fromUserId.photoUrl}
                  alt="user photo"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                  No Photo
                </div>
              )}
            </figure>
            <div className="card-body ">
              <div className=" flex justify-between items-center">
                <h2 className="card-title">{`${
                  interestedUser.fromUserId.firstName
                } ${interestedUser?.fromUserId?.lastName || ""}`}
                </h2>
                <span className="card-title">
                  age : {interestedUser.fromUserId.age}
                </span>
              </div>

              <p>{interestedUser.fromUserId.about}</p>
              {interestedUser?.fromUserId?.skills?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {interestedUser.fromUserId.skills.map((skill, i) => (
                    <span key={i} className="badge badge-primary badge-outline">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <div className="card-actions justify-evenly mt-4">
                <button
                  onClick={() => handleRequest(interestedUser._id, "accepted")}
                  className="btn btn-primary"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRequest(interestedUser._id, "rejected")}
                  className="btn btn-secondary"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Request;
