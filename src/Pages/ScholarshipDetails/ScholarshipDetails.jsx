import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import "./scholarshipdetails.css";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

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
    <>
      {" "}
      <Helmet>
        <title>Home |{`${scholarship?.universityName}`}</title>
      </Helmet>
      <div className=" min-h-[400px] container relative">
        <div className="pt-[100px] pb-[200px] background">
          <SectionTitle
            heading={scholarship?.universityName}
            subheading={"<<< Know more about >>>"}
          ></SectionTitle>
        </div>
        <div className="lottie-body mt-[300px] ">
          <div className="ocean">
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScholarshipDetails;
