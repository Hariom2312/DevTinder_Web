import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleRequest(userId, status) {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      toast.success("request send");
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(`Error to send ${status} request`, error);
      toast.error(
        error?.response?.data?.message || `Failed to send ${status} request`
      );
    }
  }

  const fetchFeed = async () => {
    if (feed) return;
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [feed]);

  if (loading) {
    return (
      <div className="text-center mt-8 text-xl font-bold ">Loading ...</div>
    );
  }

  if (!feed) {
    return;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-2 bg-[url(./assets/bg1.jpg)] bg-no-repeat bg-center bg-cover">
      {feed.length <= 0 ? (
        <div className="text-xl mt-2 text-center">
          {" "}
          No More User in Feed ...
        </div>
      ) : (
        <div>
          {feed[0] && (
            <>
              <div
                key={feed[0]._id}
                className="card bg-base-200 w-96 shadow-sm mb-16"
              >
                <figure>
                  {feed[0].photoUrl ? (
                    <img
                      className="w-full h-90 object-cover"
                      src={feed[0].photoUrl}
                      alt="user photo"
                    />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                      No Photo
                    </div>
                  )}
                </figure>
                <div className="card-body">
                  <div className=" flex justify-between items-center">
                    <h2 className="card-title">
                      {`${feed[0].firstName} ${feed[0].lastName || ""}`}
                    </h2>
                    {feed[0].age && feed[0].gender && (
                      <span className="card-title">
                        age: {feed[0].age}, {feed[0].gender}
                      </span>
                    )}
                  </div>
                  <p>{feed[0].about}</p>
                  {feed[0]?.skills?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {feed[0].skills.map((skill, i) => (
                        <span
                          key={i}
                          className="badge badge-primary badge-outline"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="card-actions justify-evenly mt-4">
                    <button
                      onClick={() => handleRequest(feed[0]._id, "interested")}
                      className="btn btn-primary"
                    >
                      Interested
                    </button>
                    <button
                      onClick={() => handleRequest(feed[0]._id, "ignored")}
                      className="btn btn-secondary"
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
