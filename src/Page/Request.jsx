import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const requestId = _id;
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/pending_request", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  return (
    <div className="text-center pt-10 pb-30 min-h-screen bg-[url(./assets/bg4.jpg)] bg-no-repeat bg-center bg-cover">
     {requests.length > 0  && <h1 className="text-bold text-white text-2xl">Connection Requests</h1> }
      {requests.length <= 0 ? (
        <div className="text-xl mt-2 text-center">
          No More User in Feed ...
        </div>
      ) : (
        <div>
          {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className="h-auto m-4 flex justify-center items-center "
              >
                <div className="flex justify-center items-center p-4 rounded-lg bg-base-300">
                  <div>
                    <img
                      alt="photo"
                      className="w-20 h-20 rounded-full"
                      src={photoUrl}
                    />
                  </div>
                  <div className="text-left mx-4">
                    <h2 className="font-bold text-xl">
                      {firstName} {lastName || ""}
                    </h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <div className="w-auto h-auto md:w-64 md:h-20 overflow-y-scroll p-2 border rounded">
                      <p className="w-full overflow-hidden">{about || ""}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 md:flex-row md:ml-8">
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-secondary mx-2"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Requests;
