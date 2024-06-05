import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const TopReview = () => {
  const axiosPublic = useAxiosPublic();

  const { data: topScholarships = [], isLoading } = useQuery({
    queryKey: ["topReviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/top-reviews");
      return res.data;
    },
  });
  console.log(topScholarships);
  return <div></div>;
};

export default TopReview;
