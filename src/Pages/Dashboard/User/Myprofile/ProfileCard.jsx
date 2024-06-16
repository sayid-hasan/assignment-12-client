import { useQuery } from "@tanstack/react-query";
import "./profilecard.css";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
const ProfileCard = ({ user }) => {
  const axiosSecure = useAxiosSecure();
  // get user role
  const { data: loggeduser = {} } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <div className="card-container mx-auto">
        <header className="header">
          <img className="img" src={user.photoURL} alt={user.displayName} />
        </header>
        <div className="py-5 space-x-3">
          <h1 className="bold-text">{user.displayName}</h1>
          <h2 className="normal-text">{user.email}</h2>
          <h2 className="bold-text">
            {loggeduser?.role ? loggeduser?.role : "user"}
          </h2>
        </div>
        {/* <div className="social-container">
          <div className="followers">
            <h1 className="bold-text">{props.followers}</h1>
            <h2 className="smaller-text">Followers</h2>
          </div>
          <div className="likes">
            <h1 className="bold-text">{props.likes}</h1>
            <h2 className="smaller-text">Likes</h2>
          </div>
          <div className="photos">
            <h1 className="bold-text">{props.photos}</h1>
            <h2 className="smaller-text">Photos</h2>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProfileCard;
