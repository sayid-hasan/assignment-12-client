import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import MainCard from "./card/MainCard";

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

  return (
    <div className="my-10 max-w-7xl mx-auto">
      <div>
        <SectionTitle
          heading={"top scholarships"}
          subheading={"<<< find out about our top scholarship>>>"}
        ></SectionTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
        {topScholarships.map((item) => (
          <MainCard key={item._id} item={item}></MainCard>
        ))}
      </div>
    </div>
  );
};

export default TopScholarship;
