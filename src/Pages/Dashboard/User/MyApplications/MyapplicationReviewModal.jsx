import { useForm } from "react-hook-form";

// import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";
// import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const MyapplicationReviewModal = ({
  reviewmodal,
  scholarshipId,
  //   universityName,
  //   scholarshipCategory,
  //   subjectCategory,
  setReviewModal,
  //   applicationFees,
  //   serviceCharge,
}) => {
  console.log(scholarshipId);
  const { user } = useAuth();
  //   const navigate = useNavigate();
  //   const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // react form hook
  const {
    register,
    handleSubmit,

    reset,
  } = useForm();
  // rating point
  const [ratingPoint, setRatingPoint] = useState(null);
  const ratingChanged = (newRating) => {
    setRatingPoint(newRating);
  };
  // get data for display
  const { data: appliedScholarship = [], refetch } = useQuery({
    queryKey: ["applieApplications", scholarshipId],

    queryFn: async () => {
      const res = await axiosSecure.get(`/appliedapplication/${scholarshipId}`);
      return res?.data;
    },
  });
  refetch();
  //   console.log(appliedScholarship);
  const { universityName, scholarshipName } = appliedScholarship;
  // getdata from onsubmit
  const onSubmit = async (data) => {
    const { reviewComment } = data;
    console.log(data);
    const reviewDate = new Date();
    const reviewData = {
      scholarshipId,
      ratingPoint,
      reviewComment,
      reviewDate,

      scholarshipName,

      universityName,
      loggedInUserName: user?.displayName,
      userImage: user?.photoURL,
      userEmail: user?.email,
    };
    console.log(reviewData);
    //   INSERT data on database as appliedScholarships
    try {
      const res = await axiosSecure.post(`/reviews`, reviewData);
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thanks for your opinion",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        setReviewModal(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {reviewmodal && (
        <div className="flex justify-center w-full">
          {/* // <!-- Modal toggle --> */}

          {/* // <!-- Main modal --> */}
          <div
            id="crud-modal"
            tabIndex="-1"
            className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 flex   z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-2  w-full max-w-4xl max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 text-center w-full dark:text-white">
                    Review
                  </h3>
                  {/* close button to do set setmodal false */}
                  <button
                    onClick={() => setReviewModal(false)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex items-center flex-col w-full py-5"
                >
                  <div className="flex items-center gap-4 mb-4 flex-col w-full">
                    <div className="w-1/2">
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={40}
                        color2={"#ffd700"}
                      />
                    </div>
                    <div className=" w-1/2 ">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Review
                      </label>
                      <textarea
                        id="description"
                        {...register("reviewComment")}
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your Opinion"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    add review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MyapplicationReviewModal;
