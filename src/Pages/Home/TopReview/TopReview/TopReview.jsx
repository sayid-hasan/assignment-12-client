import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { FreeMode, Navigation } from "swiper/modules";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { FaQuoteRight } from "react-icons/fa";
import "./TopReview.css";

import "./../shared/ReviewCard/reviewCard.css";

const TopReview = () => {
  const axiosPublic = useAxiosPublic();
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

  const { data: topReviews = [], isLoading } = useQuery({
    queryKey: ["topReviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/top-reviews");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="loading-spinner"></div>;
  }
  console.log(topReviews);

  return (
    <div className="max-w-7xl h-fit mx-auto py-5 ">
      <div>
        <SectionTitle
          subheading={"<<< What Our Clients Say >>>"}
          heading={"People's voice"}
        ></SectionTitle>
      </div>
      <div className=" card-bg font-Inter bg-opacity-45 box-border dashed-border text-white py-8">
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, FreeMode]}
          className="mySwiper  "
        >
          {topReviews.map((review, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col gap-4 py-5  items-center">
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
                <Rating
                  style={{
                    maxWidth: 250,
                  }}
                  value={review.ratingPoint}
                  readOnly
                />

                <p className="text-xl max-w-[800px] text-center">
                  {/* review.reviewDate.toLocaleDateString("de-DE", options) */}
                  {getDate(review)}
                </p>
                <p className="text-2xl font-Cinzel max-w-[800px] text-center">
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
    </div>
  );
};

export default TopReview;
