import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link, useParams } from "react-router-dom";
import "./scholarshipdetails.css";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { FaMapLocation } from "react-icons/fa6";

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
  const {
    universityName,
    universityImage,
    scholarshipCategory,
    university_Location,
    postDate,
    applicationDeadline,
    subjectCategory,
    applicationFees,
    Rating,
    stipend,
    serviceCharge,
    ScholarshipDetailsField,
    _id,
  } = scholarship;
  // get review for specific schoalrship based on id
  const { data: scholarshipReview = {} } = useQuery({
    queryKey: ["scholarshipReview"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${id}`);
      return res?.data;
    },
  });
  console.log(scholarshipReview);

  return (
    <>
      {" "}
      <Helmet>
        <title>Home |{`${universityName}`}</title>
      </Helmet>
      <div className=" min-h-[400px] container relative background">
        {/* title
         */}
        <div className="pt-[100px]  background">
          <SectionTitle
            heading={scholarship?.universityName}
            subheading={"<<< Know more about >>>"}
          ></SectionTitle>
        </div>

        {/* body */}
        <div className="md:p-6 px-2 gap-7   flex md:flex-row-reverse flex-col min-h-screen md:items-center ">
          {/* 1 */}
          <div className=" w-full md:w-1/2 flex  flex-col justify-center ">
            <img
              src={universityImage}
              className="object-cover object-center w-full h-auto md:h-[550px] rounded-lg"
            />

            {/* location */}
            <div className="  flex justify-center items-center gap-4">
              <span className="text-[#05a081] text-3xl">
                <FaMapLocation></FaMapLocation>
              </span>
              <span className="text-xl font-bold tracking-widest text-black">
                {(university_Location?.city, university_Location?.country)}
              </span>
            </div>
          </div>
          {/* 2 */}
          <div className=" w-full md:w-1/2">
            <h1 className="text-2xl md:text-3xl text-[#05a081] font-bold">
              {scholarshipCategory}
            </h1>
            <span className="block text-xs font-medium tracking-widest uppercase text-violet-400 mt-5">
              {subjectCategory}
            </span>

            <p className="py-6 font-Cinzel leading-9">
              {ScholarshipDetailsField}
            </p>
            {/* fees and Rating */}
            <div>
              <div className="flex justify-between  mb-4 items-center font-bold text-black text-opacity-70  ">
                <div>
                  <span className="text-[#05a081] font-Cinzel text-xl font-bold">
                    Application Fees :{" "}
                  </span>
                  <div className="md:text-xl text-base font-bold flex items-start gap-2">
                    {applicationFees}
                    <span className="text-[#05a081]">$</span>
                  </div>
                </div>
                <div>
                  <span className="text-[#05a081] font-Cinzel text-xl font-bold">
                    Rating :{" "}
                  </span>
                  <div className="md:text-xl text-base font-bold flex justify-end gap-2">
                    {Rating}
                    <div className="rating rating-sm md:rating-md">
                      {" "}
                      <input
                        type="radio"
                        name="rating-7"
                        className="mask mask-star-2 bg-orange-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* postDate and Service Charge */}
            <div>
              <div className="flex justify-between  mb-4 items-center font-bold text-black text-opacity-70 ">
                <div>
                  <span className="text-[#05a081] font-Cinzel text-xl font-bold">
                    Posted on :{" "}
                  </span>
                  <div className="md:text-xl text-base font-bold flex items-start gap-2">
                    {postDate}
                  </div>
                </div>
                <div>
                  <span className="text-[#05a081] font-Cinzel text-xl font-bold">
                    Service Charge :{" "}
                  </span>
                  <div className="md:text-xl text-base font-bold flex justify-end gap-2">
                    {serviceCharge}
                    <span className="text-[#05a081]">$</span>
                  </div>
                </div>
              </div>
            </div>
            {/* User Name and Email */}
            <div>
              <div className="flex justify-between  mb-4 items-center font-bold text-black text-opacity-70 ">
                <div>
                  <span className="text-[#05a081] font-Cinzel text-xl font-bold">
                    Stipend
                  </span>
                  <div className="md:text-xl text-base font-bold flex items-start gap-2">
                    {stipend}
                  </div>
                </div>
                <div>
                  <span className="text-[#05a081] block text-right font-Cinzel text-xl font-bold">
                    DeadLine
                  </span>
                  <div className="md:text-xl text-base font-bold ">
                    {applicationDeadline}
                  </div>
                </div>
              </div>
            </div>

            {/* review rating */}

            {/* <div
              className=" my-3
             w-full rounded-lg  flex justify-center px-8 py-3 font-semibold  bg-[#05A081] text-white  "
            >
              {stock_status}
            </div> */}
            {/* back to homepage and saved to Bookmarks */}
            <div className="flex justify-between">
              <Link
                to={{
                  pathname: `/dashboard/payment`,
                }}
                state={{ fees: applicationFees, scholarshipId: _id }}
                className="w-full flex justify-center px-8 py-3 font-semibold rounded bg-[#05A081] text-white"
              >
                Apply
              </Link>
            </div>
          </div>
        </div>

        {/* review swipper  */}

        {/* wave svg bg */}
        {/* <div className="lottie-body mt-[300px] ">
          <div className="ocean">
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ScholarshipDetails;
