import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAvgRating = (scholarshipID) => {
  const axiosPublic = useAxiosPublic();
  console.log(scholarshipID);
  const { data: avgRating = 0, isLoading: avgRatingLoading } = useQuery({
    queryKey: ["avgRating", scholarshipID],
    queryFn: async () => {
      const res = await axiosPublic(`/average-rating/${scholarshipID}`);
      return res?.data;
    },
  });
  return [avgRating, avgRatingLoading];
};

export default useAvgRating;
