import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: appliedApplications = [] } = useQuery({
    queryKey: ["appliedApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appliedScholarship/${user?.email}`);
      return res?.data;
    },
  });
  console.log(appliedApplications);
  return (
    <div>
      <Helmet>Dashboard | My Applications</Helmet>
    </div>
  );
};

export default MyApplications;
