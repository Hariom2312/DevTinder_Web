// import { toast } from "react-toastify";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const Feed = () => {
//   const [showUser, setShowUser] = useState(true);
//   const [feedUsers, setFeedUsers] = useState([]);
//   const user = useSelector((store) => store.user);
//   // console.log("user",user);

//   async function handleInterested(userId) {
//     const toUserId = userId;
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/send/interested/" + toUserId,
//         {},
//         { withCredentials: true }
//       );
//       setShowUser(false);
//       toast.success(res.data.message);
//       // console.log(res.data);
//     } catch (error) {
//       console.log("Error in Interested:", error);
//       toast.error(
//         error?.response?.data?.message || "Failed to send Interested"
//       );
//     } finally {
//       setShowUser(true);
//     }
//   }

//   async function handleIgnore(userId) {
//     const toUserId = userId;
//     // e.preventDefault();
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/send/ignored/" + toUserId,
//         {},
//         { withCredentials: true }
//       );
//       toast.success(res.data.message);
//       // console.log(res.data);
//     } catch (error) {
//       console.log("Error in Interested:", error);
//       toast.error(
//         error?.response?.data?.message || "Failed to send Interested"
//       );
//     }
//   }

//   const fetchFeed = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/feed", {
//         withCredentials: true,
//       });
//       // console.log("Feed API response:", res.data.data);
//       setFeedUsers(res.data.data);
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.res?.data?.message || "Error fetching users");
//     }
//   };

//   useEffect(() => {
//     if(user) {
//       fetchFeed();
//     }
//   }, [user , feedUsers.length === 0]);

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center pt-8">
//       {feedUsers.length === 0 ? (
//         <div className="text-xl font-bold ">
//           Loading <span className="loading loading-dots loading-xl"></span>
//         </div>
//       ) : (
//         feedUsers.map((user,key) => {
//           return (
//             <>
//               {showUser && (
//                 <div
//                   key={user._id || key}
//                   className="card bg-base-200 w-96 shadow-sm mb-8"
//                 >
//                   <figure>
//                     <img src={user?.photoUrl || ""} alt="user photo" />
//                   </figure>
//                   <div className="card-body">
//                     <h2 className="card-title">{`${user.firstName} ${
//                       user?.lastName || ""
//                     }`}</h2>
//                     <p>{user.about}</p>
//                     <div className="card-actions justify-evenly mt-4">
//                       <button
//                         onClick={() => handleInterested(user._id)}
//                         className="btn btn-primary"
//                       >
//                         Interested
//                       </button>
//                       <button
//                         onClick={() => handleIgnore(user._id)}
//                         className="btn btn-secondary"
//                       >
//                         Ignore
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           );
//         })
//       )}
//     </div>
//   );
// };

// export default Feed;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";

// const Feed = () => {
//   const [feedUsers, setFeedUsers] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Fetch feed users from backend
//   useEffect(() => {
//     const fetchFeed = async () => {
//       try {
//         const res = await axios.get(BASE_URL+"/user/feed", { withCredentials: true });
//         setFeedUsers(res.data.data || []); // backend should send {users: [...]}
//       } catch (err) {
//         console.error("Error fetching feed:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeed();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-lg font-bold">
//         Loading feed...
//       </div>
//     );
//   }

//   if (!feedUsers.length || currentIndex >= feedUsers.length) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-xl font-bold">
//         No more users in feed.
//       </div>
//     );
//   }

//   const handleInterested = () => {
//     console.log("Interested in:", feedUsers[currentIndex]);
//     setCurrentIndex((prev) => prev + 1);
//   };

//   const handleIgnore = () => {
//     console.log("Ignored:", feedUsers[currentIndex]);
//     setCurrentIndex((prev) => prev + 1);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200">
//       <div className="relative w-[350px] h-[500px]">
//         {feedUsers.slice(currentIndex).map((user, index) => (
//           <div
//             key={user._id}
//             className="absolute top-0 left-0 w-full h-full transition-all duration-500"
//             style={{ zIndex: feedUsers.length - index }}
//           >
//             <div className="card bg-base-100 shadow-xl w-full h-full">
//               <figure className="h-2/3">
//                 <img
//                   src={
//                     user.photoUrl ||
//                     "https://imgs.search.brave.com/tSeEr9hhQ8HTygpEwWkKnVG7h78lc7FKg0t6lKOjQzU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3Ivc2lsdmVyLW1l/bWJlcnNoaXAtaWNv/bi1kZWZhdWx0LWF2/YXRhci1wcm9maWxl/LWljb24tbWVtYmVy/c2hpcC1pY29uLXNv/Y2lhbC1tZWRpYS11/c2VyLWltYWdlLXZl/Y3Rvci1pbGx1c3Ry/YXRpb25fNTYxMTU4/LTQxOTUuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw"
//                   }
//                   alt="User"
//                   className="w-full h-full object-cover"
//                 />
//               </figure>
//               <div className="card-body">
//                 <h2 className="card-title">
//                   {user.firstName} {user.lastName}
//                 </h2>
//                 <p>{user.about || "No about info"}</p>
//                 {user.skills?.length > 0 && (
//                   <div className="mt-2 flex flex-wrap gap-2">
//                     {user.skills.map((skill, i) => (
//                       <span
//                         key={i}
//                         className="badge badge-primary badge-outline"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//                 <div className="card-actions justify-between mt-4">
//                   <button
//                     className="btn btn-error w-1/2"
//                     onClick={handleIgnore}
//                   >
//                     Ignore
//                   </button>
//                   <button
//                     className="btn btn-success w-1/2"
//                     onClick={handleInterested}
//                   >
//                     Interested
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;

import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Feed = () => {
  const [feedUsers, setFeedUsers] = useState([]);
  const user = useSelector((store) => store.user);

  async function handleRequest(userId, status) {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message);
      // remove that user from feed
      setFeedUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (error) {
      console.log(`Error to send ${status} request`, error);
      toast.error(
        error?.response?.data?.message || `Failed to send ${status} request`
      );
    }
  }

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      setFeedUsers(res.data.data || []); // expects { data: [...] }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error fetching users");
    }
  };

  useEffect(() => {
    if (user) {
      fetchFeed();
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-8">
      {feedUsers.length === 0 ? (
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
        feedUsers.map((feedUser) => (
          <div
            key={feedUser._id}
            className="card bg-base-200 w-96 shadow-sm mb-12"
          >
            <figure>
              {feedUser.photoUrl ? (
                <img className="w-full h-90 object-cover" src={feedUser.photoUrl} alt="user photo" />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                  No Photo
                </div>
              )}
            </figure>
            <div className="card-body">
               <div className=" flex justify-between items-center">
                <h2 className="card-title">{`${
                  feedUser.firstName
                } ${feedUser.lastName || ""}`}
                </h2>
                {feedUser.age && 
                <span className="card-title">
                  age : {feedUser.age}
                </span>
                }
              </div>
              <p>{feedUser.about}</p>
              {user.skills?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {user.skills.map((skill, i) => (
                    <span key={i} className="badge badge-primary badge-outline">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <div className="card-actions justify-evenly mt-4">
                <button
                  onClick={() => handleRequest(feedUser._id, "interested")}
                  className="btn btn-primary"
                >
                  Interested
                </button>
                <button
                  onClick={() => handleRequest(feedUser._id, "ignored")}
                  className="btn btn-secondary"
                >
                  Ignore
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
