import { FcFeedback } from "react-icons/fc";
import { MdCancel, MdDetails } from "react-icons/md";

import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DetailsModal from "./DetailsModal";
import FeedbackModal from "./FeedbackModal";
import Swal from "sweetalert2";

const AllAppliedScholarshipTR = ({ scholarship, idx, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [detailsModal, setDetailsModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const { data: scholashipdetails = {} } = useQuery({
    queryKey: ["scholashipdetails", scholarship.scholarshipId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarships/${scholarship.scholarshipId}`
      );
      return res?.data;
    },
  });
  const handleCancel = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedData = { applicationStatus: "rejected" };
        const res = await axiosSecure.patch(
          `/appliedScholarship/${scholarship?._id}`,
          updatedData
        );
        if (res?.data?.modifiedCount > 0) {
          Swal.fire({
            title: "rejected!",
            text: "Application has been canceled",
            icon: "success",
          });
          refetch();
        } else {
          Swal.fire({
            title: "Oops!",
            text: "facing Error",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <>
      <tr key={scholarship._id}>
        <th>{idx + 1}</th>
        <td>
          <div className="text-[#737373] text-base py-3 md:py-6 ">
            <span>{scholarship?.universityName}</span>
          </div>
        </td>
        <td className="text-[#737373] text-base py-3 md:py-6 ">
          <span>{scholarship?.scholarshipName}</span>
        </td>
        <td className="text-[#737373] text-base py-3 md:py-6 ">
          <span>{scholarship?.scholarshipCategory}</span>
        </td>
        <td>
          <div className="text-[#737373] text-base py-3 md:py-6 ">
            <span>{scholarship?.subjectCategory}</span>
          </div>
        </td>
        <td>
          <div className="text-[#737373] text-base py-3 md:py-6 ">
            <span>{scholarship?.applicantAspiredDegree}</span>
          </div>
        </td>
        <td>
          <div className="text-[#737373] text-center text-base py-3 md:py-6 ">
            <span>{scholashipdetails?.applicationFees}$</span>
          </div>
        </td>
        <td>
          <div className="text-[#737373] text-center text-base py-3 md:py-6 ">
            <span>{scholashipdetails?.serviceCharge}$</span>
          </div>
        </td>
        <td>
          <div
            className={` text-[#737373] font-bold text-center text-base py-3 md:py-6`}
          >
            <span>{scholarship?.applicationStatus}</span>
          </div>
        </td>

        {/* action butoon */}
        <th>
          <button
            onClick={() => setDetailsModal(true)}
            className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
          >
            <MdDetails></MdDetails>
          </button>
        </th>
        <th>
          <button
            onClick={() => setFeedbackModal(true)}
            className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
          >
            <FcFeedback></FcFeedback>
          </button>
        </th>
        <th>
          <button
            title="cancel"
            onClick={handleCancel}
            className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
          >
            <MdCancel></MdCancel>
          </button>
        </th>
      </tr>
      {
        <>
          <DetailsModal
            detailsModal={detailsModal}
            setDetailsMoDal={setDetailsModal}
            appliedUniveristy={scholarship?.universityName}
            appliedDegree={scholarship?.applicantAspiredDegree}
            appliedScholarshipCategory={scholarship?.scholarshipCategory}
          ></DetailsModal>
          <FeedbackModal
            feedbackModal={feedbackModal}
            setFeedbackModal={setFeedbackModal}
            appliedScholarshipId={scholarship?._id}
          ></FeedbackModal>
        </>
      }
    </>
  );
};

export default AllAppliedScholarshipTR;
