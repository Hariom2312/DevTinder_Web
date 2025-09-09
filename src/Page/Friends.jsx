import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addConnections } from "../utils/connectionSlice";
import Chat from "./Chat";

const Friends = () => {
  const [expanded, setExpanded] = useState({});
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="min-h-screen w-vw text-center py-10 px-2 bg-[url(./assets/bg.jpg)] bg-cover bg-no-repeat">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="w-auto sm:w-[640px] mx-auto flex justify-center items-center m-4 p-4 rounded-lg bg-base-300"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName} {lastName || ""}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p className="hidden sm:block overflow-hidden">
                {expanded[_id] ? about + " " : about.substring(0, 35) + "... "}
                <button
                  className=" border-b-1"
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [_id]: !prev[_id],
                    }))
                  }
                >
                  {expanded[_id] ? "Show less" : "Show more"}
                </button>
              </p>
            </div>
            <Link to={"/chat/" + _id}>
              <button className="btn btn-primary mt-2 sm:mt-0 ml-8 sm:mr-8">
                Chat
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Friends;
