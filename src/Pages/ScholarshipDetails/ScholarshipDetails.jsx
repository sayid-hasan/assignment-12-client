import { useQuery } from "@tanstack/react-query";

import { Link, useParams } from "react-router-dom";
import "./scholarshipdetails.css";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { FaMapLocation, FaQuoteRight } from "react-icons/fa6";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import ReactStars from "react-rating-stars-component";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// stars

const ScholarshipDetails = () => {
  const { id } = useParams();
  console.log(id);

  const axiosSecure = useAxiosSecure();
  const { data: scholarship = {} } = useQuery({
    queryKey: ["schoalrship"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res?.data;
    },
  });

  // stars

  // date local string
  const getDate = (review) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const date = new Date(review.reviewDate);
    const result = date.toLocaleDateString("en-GB", options);
    return result;
  };
  const {
    // scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    // universityWorldRank,
    subjectCategory,
    scholarshipCategory,
    // degree,
    // tuitionFees,
    applicationFees,
    serviceCharge,
    applicationDeadline,
    postDate,
    ScholarshipDetailsField,
    // postedUserEmail,
    stipend,
    _id,
  } = scholarship;
  // get review for specific schoalrship based on id
  const { data: scholarshipReview = [] } = useQuery({
    queryKey: ["scholarshipReview"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
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
      <div className=" min-h-[400px] container  background">
        {/* title
         */}
        <div className="pt-[100px]  ">
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
                {(universityCity, universityCountry)}
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
                  <div className="md:text-xl text-base font-bold flex justify-center gap-2">
                    {4.5}
                  </div>
                  <div className=" flex justify-start">
                    <ReactStars
                      size={35}
                      isHalf={true}
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      activeColor="#ffd700"
                      color="#f4f5f6"
                      value={4.5}
                      edit={false}
                    />
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
                state={{ scholarshipId: _id }}
                className="w-full flex justify-center px-8 py-3 font-semibold rounded bg-[#05A081] text-white"
              >
                Apply
              </Link>
            </div>
          </div>
        </div>

        {/* review swipper  */}

        {scholarshipReview.length > 0 && (
          <>
            <div className=" grid grid-cols-1 font-Inter min-h- bg-opacity-45 box-border  text-white py-8">
              <Swiper
                slidesPerView={2}
                spaceBetween={20}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {scholarshipReview.map((review, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="grid grid-cols-1 gap-4 py-8 review-background max-w-1/2 dashed-border items-center">
                      <div className="img-container">
                        <img
                          src={review?.userImage}
                          alt={name}
                          className="person-img"
                        />
                        <span className="quote-icon">
                          <FaQuoteRight />
                        </span>
                      </div>
                      {/* stars not showing */}
                      <div className="text-center flex justify-center">
                        <ReactStars
                          size={35}
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"
                          color="#f4f5f6"
                          value={review?.ratingPoint}
                          edit={false}
                        />
                      </div>

                      <p className="text-xl max-w-[800px] text-center">
                        {/* review.reviewDate.toLocaleDateString("de-DE", options) */}
                        {getDate(review)}
                      </p>
                      <p className="text-xl font-Cinzel max-w-[800px] text-center">
                        {review?.reviewComment}
                      </p>
                      <p className="text-[#FF7F46] font-Inter font-medium text-3xl leading-[39px]">
                        {review?.loggedInUserName}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}
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
