import moment from "moment";

import { FaQuoteLeft, FaQuoteRight, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

const AllReviewCard = ({ review, refetch }) => {
  const axiosSecure = useAxiosSecure();
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
    <div>
      <>
        {" "}
        <article className=" review">
          <div className="relative w-[150px] aspect-square rounded-[50%] mx-auto mb-[20px] border-none outline-none bg-[blue] ">
            <img
              src={review?.userImage}
              alt={name}
              className="person-img border-none appearance-none"
            />
            <span className="quote-icon">
              <FaQuoteRight />
            </span>
          </div>
          <h4 className="text-base font-Inter font-bold">
            {review?.loggedInUserName}
          </h4>
          <p className="text-base font-Inter font-medium">
            {review?.universityName}
          </p>
          <p className="text-base font-Inter font-medium">
            {review?.subjectCategory}
          </p>
          <p className="text-base font-Inter font-medium">
            {moment(review?.reviewDate).format("LL")}
          </p>
          <p className="text-base relative font-Inter my-3 inline-flex justify-center w-full  font-medium">
            <span className="absolute -top-3 -left-2">
              <FaQuoteLeft className="text-sm" />
            </span>{" "}
            <span className="mx-[2px]">{review?.reviewComment}</span>
            <span className="absolute bottom-0 right-5">
              <FaQuoteRight className="text-sm" />
            </span>
          </p>
          <p className="text-base font-Inter font-bold">
            {review?.ratingPoint}
          </p>

          <div className="button-container my-4">
            <button
              onClick={() => handleDelete(review._id)}
              className="inline-flex gap-2 items-center  px-7 border border-transparent h-auto text-xl hover:bg-transparent hover:border-[#FF7F46]  tracking-wide py-3 rounded-full font-semibold  bg-[#FF7F46] hover:text-black text-white"
            >
              Delete <FaTrashAlt></FaTrashAlt>
            </button>
          </div>
        </article>{" "}
      </>
    </div>
  );
};

export default AllReviewCard;
