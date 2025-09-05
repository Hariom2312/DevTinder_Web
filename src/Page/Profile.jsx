import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
const Profile = () => {
  const user = useSelector((store) => store.user); // from redux
  return (
    user && (
        <div>
          <EditProfile user={user} />
        </div>
      )
  );
};

export default Profile;
