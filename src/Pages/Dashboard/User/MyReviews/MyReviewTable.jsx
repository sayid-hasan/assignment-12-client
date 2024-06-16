import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";

const MyReviewTable = ({ review, idx, refetch }) => {
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
  const [modal, setModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(review?.reviewDate);
  const onSubmit = async (data) => {
    const { reviewComment } = data;
    console.log(reviewComment);
    const reviewData = {
      reviewComment,
      ratingPoint,
    };
    //   update data on database as appliedScholarships
    try {
      const res = await axiosSecure.patch(`/reviews/${review._id}`, reviewData);
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application has been updated",
          showConfirmButton: false,
          timer: 1500,
        });

        refetch();
        setModal(false);
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "top-end",
        icon: "Facing Error ,try again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleEdit = () => {
    setModal(true);
  };
  const reviewDate = date.toLocaleDateString("en-GB", options);
  // cancel applictions
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/reviews/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <>
      {/* table */}

      <tbody>
        <tr>
          <th>{idx + 1}</th>
          <td>
            <div className="text-[#737373] text-base py-3 md:py-6 ">
              <span>{review?.scholarshipName}</span>
            </div>
          </td>
          <td className="text-[#737373] text-base py-3 md:py-6 ">
            <span>{review?.universityName}</span>
          </td>
          <td>
            <div className="text-[#737373] text-base py-3 md:py-6 max-w-[100px] md:max-w-[200px]">
              <span>{review?.reviewComment}</span>
            </div>
          </td>
          <td>
            <div className="text-[#737373] text-base py-3 md:py-6 ">
              <span>{reviewDate}</span>
            </div>
          </td>

          {/* delete button */}
          <th>
            <button
              title="cancel"
              onClick={() => handleDelete(review._id)}
              className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
            >
              <FaTrashAlt></FaTrashAlt>
            </button>
          </th>
          {/* edit button */}
          <th>
            <button
              onClick={() => handleEdit(review._id)}
              className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
            >
              <FaEdit></FaEdit>
            </button>
          </th>
        </tr>
      </tbody>
      <>
        {modal && (
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
                      onClick={() => setModal(false)}
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
                      update review
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default MyReviewTable;
