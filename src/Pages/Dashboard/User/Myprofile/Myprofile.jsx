import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import ProfileCard from "./ProfileCard";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";

const Myprofile = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <Helmet>
        <title>Dashboard | My Profile</title>
      </Helmet>
      <div>
        {" "}
        <div className="">
          <SectionTitle
            heading={"Profile"}
            subheading={`<<< Details of ${user?.displayName} >>>`}
          ></SectionTitle>
        </div>
        <ProfileCard user={user}></ProfileCard>
      </div>
    </div>
  );
};

export default Myprofile;
