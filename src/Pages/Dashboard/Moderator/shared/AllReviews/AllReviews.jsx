import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import AllReviewCard from "./AllReviewCard";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: allreviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allreviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews`);
      return res.data;
    },
  });
  console.log(allreviews);
  if (isLoading) {
    return <div className="loading-spinner"></div>;
  }
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Dashboard | All Reviews</title>
      </Helmet>
      <div>
        <SectionTitle
          heading={"Reviews"}
          subheading={"<<< find about user reviews >>>"}
        ></SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-7 ">
        {allreviews.map((review) => (
          <AllReviewCard
            key={review._id}
            refetch={refetch}
            review={review}
          ></AllReviewCard>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
