import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const ScholarshipDetails = () => {
  const { id } = useParams();
  console.log(id);
  const axiosPublic = useAxiosPublic();
  const { data: scholarship = {} } = useQuery({
    queryKey: ["schoalrship"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/scholarships/${id}`);
      return res?.data;
    },
  });
  console.log(scholarship);
  return (
    <div>
      <h2>Details</h2>
    </div>
  );
};

export default ScholarshipDetails;
