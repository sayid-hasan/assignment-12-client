import PropTypes from "prop-types";
// import { useState } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const MainCard = ({ item }) => {
  // const [postedDateString, setPostedDateString] = useState(null);
  // // Get the posted date from the scholarship object
  // const postedDate = new Date(item.postDate);

  // // Calculate the time difference in milliseconds between the current date and the posted date
  // const timeDifference = Date.now() - postedDate.getTime();

  // // Convert the time difference from milliseconds to days
  // const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // // Construct the user-friendly string based on the number of days difference

  // if (daysDifference === 0) {
  //   setPostedDateString("Today");
  // } else if (daysDifference === 1) {
  //   setPostedDateString("Yesterday");
  // } else {
  //   setPostedDateString(`${daysDifference} + " days ago"`);
  // }

  return (
    <>
      {" "}
      {/* // card1 */}
      <div className=" w-full md:max-w-xl grid grid-cols-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div
          className="
              w-full
              md:max-w-xl
              relative 
              overflow-hidden 
              rounded-t-xl
            "
        >
          <img
            className="
                object-cover 
                h-[400px]
             
                w-full 
                group-hover:scale-110
                transition
              "
            src={item?.universityImage}
            alt="item"
          />
          <div
            className="
              absolute
              top-3
              right-3
            "
          ></div>
        </div>
        <div className="py-5 px-3 min-h-[75px] box-border flex flex-col justify-between">
          <h5 className="mb-2 text-3xl font-Jaro font-bold tracking-wide text-gray-900 dark:text-white">
            {item?.universityName}
          </h5>

          <p className="mb-3 font-bold text-[#FF7F46] tracking-wide  font-Cinzel text-base dark:text-gray-400">
            {item?.scholarshipCategory}
          </p>
          <p className="mb-2 font-bold font-Cinzel tracking-wide   text-base dark:text-gray-400">
            <span className="font-Inter "> Posted On :</span> {item?.postDate}
          </p>
          <div className=" flex justify-start mb-2">
            <ReactStars
              size={20}
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

          <div className="mb-3 font-bold  w-full tracking-wide  font-Cinzel text-base flex justify-between dark:text-gray-400">
            <div className="w-1/2">
              <span className="font-Inter "> Deadline : </span>{" "}
              {item?.applicationDeadline}
            </div>
            <div className="w-1/2">
              <span className="font-Inter "> Subject : </span>{" "}
              <span className="text-sm">
                {item?.subjectCategory.length > 12
                  ? `${item?.subjectCategory.slice(0, 12)}...`
                  : item?.subjectCategory}
              </span>
            </div>
          </div>
          <div className="mb-3 font-bold  w-full tracking-wide  font-Cinzel text-base flex justify-between dark:text-gray-400">
            <div className="w-1/2">
              {item?.universityCity}, {item?.universityCountry}
            </div>
            <div className="w-1/2">
              <span className="font-Inter "> Fees : </span>{" "}
              {item?.applicationFees}
            </div>
          </div>

          {/* button */}
          <Link to={`/scholarships/${item._id}`}>
            {" "}
            <button className=" self-end inline-flex font-Jaro w-full transition items-center justify-center px-5 py-3 text-base font-medium text-center text-black border border-[#FF7F46] bg-transparent rounded-lg hover:bg-[#FF7F46] hover:border-white hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-[#FF7F46]">
              View Details
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

MainCard.propTypes = {
  item: PropTypes.object,
};

export default MainCard;
