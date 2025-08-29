import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Feed = () => {
  const [feedUsers, setFeedUsers] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/feed", {
          withCredentials: true,
        });
        console.log("Feed API response:", res);
        setFeedUsers(res.data.data); // Make sure your backend returns an array
      } catch (error) {
        console.log(error);
        toast.error(error?.res?.data?.message || "Error fetching users");
      }
    };
    fetchFeed();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-8">
      {feedUsers.length === 0 ? (
        <div className="text-xl font-bold ">
          Loading <span className="loading loading-dots loading-xl"></span>
        </div>
      ) : (
        feedUsers.map((user) => {
          return (
            <div
              key={user._id}
              className="card bg-base-200 w-96 shadow-sm mb-8"
            >
              <figure>
                <img src={user?.photoUrl || ""} alt="user photo" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{`${user.firstName} ${user?.lastName}`}</h2>
                <p>
                  A card component has a figure, a body part, and inside body
                  there are title and actions parts
                </p>
                <div className="card-actions justify-evenly mt-4">
                  <button className="btn btn-primary">Interested</button>
                  <button className="btn btn-secondary">Ignore</button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Feed;
