import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addConnections } from "../utils/connectionSlice";

const Friends = () => {
  const [expanded, setExpanded] = useState({});
  const [lastMessages, setLastMessages] = useState({});
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error("Error fetching connections", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="min-h-screen w-full text-center py-10 px-2 bg-[url(./assets/bg.jpg)] bg-cover bg-no-repeat">
      <h1 className="text-bold text-white text-3xl mb-6">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <Link
            key={_id}
            to={"/chat/" + _id}
            className="w-auto sm:w-[640px] mx-auto flex justify-between items-center m-4 p-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition"
          >
            <div className="flex items-center gap-4">
              <img
                alt="photo"
                className="w-16 h-16 rounded-full object-cover border border-gray-600"
                src={photoUrl}
              />
              <div className="text-left">
                <h2 className="font-bold text-lg">
                  {firstName} {lastName || ""}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-400">{age + ", " + gender}</p>
                )}

                {/* About / message preview */}

                <p className="hidden sm:block text-sm text-gray-500 truncate w-48">
                  {expanded[_id]
                    ? about
                    : about?.substring(0, 35) +
                      (about?.length > 35 ? "..." : "")}
                </p>
              </div>
            </div>

            {/* Right side actions */}
            <div>
              <button className="btn btn-primary text-sm">Chat</button>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default Friends;
