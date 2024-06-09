import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import MainCard from "./card/MainCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const TopScholarship = () => {
  const axiosPublic = useAxiosPublic();

  const { data: topScholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosPublic.get("/top-sholarship");
      return res.data;
    },
  });
  console.log(topScholarships);

  if (isLoading) {
    return <div className="loading-spinner"></div>;
  }

  // calculate posteddate

  return (
    <div className="my-10 max-w-7xl mx-auto">
      <div>
        <SectionTitle
          heading={"top scholarships"}
          subheading={"<<< find out about our top scholarship>>>"}
        ></SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-7 ">
        {topScholarships.map((item) => (
          <MainCard key={item._id} item={item}></MainCard>
        ))}
      </div>
      <div className="flex justify-center mb-5">
        <Link
          to="/allscholarship"
          className="self-center flex justify-center items-center gap-3 mb-5  px-10 border hover:text-black border-transparent h-auto text-xl hover:bg-transparent hover:border-[#FF7F46]  tracking-wide py-3 rounded-full font-semibold  bg-[#FF7F46] text-white"
        >
          View All Scholarships <FaArrowRight></FaArrowRight>
        </Link>
      </div>
    </div>
  );
};

export default TopScholarship;
