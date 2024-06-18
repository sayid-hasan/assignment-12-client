import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";
import UpdateScholarshipModal from "./UpdateScholarshipModal";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Scholarship = ({ scholarship, idx, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [modal, setModal] = useState(false);
  const handleEditScholarship = () => {
    setModal(true);
  };
  //  delete scholarship
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
          .delete(`/scholarships/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Scholarship has been deleted.",
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
      <tr key={scholarship._id}>
        <th>{idx + 1}</th>
        <td>
          <div className="text-[#737373] text-base py-3 md:py-6 ">
            <span>{scholarship?.scholarshipName}</span>
          </div>
        </td>
        <td className="text-[#737373] text-base py-3 md:py-6 ">
          <span>{scholarship?.universityName}</span>
        </td>
        <td>
          <div className="text-[#737373] text-base py-3 md:py-6 ">
            <span>{scholarship?.subjectCategory}</span>
          </div>
        </td>
        <td>
          <div className="text-[#737373] text-base py-3 md:py-6 ">
            <span>{scholarship?.degree}</span>
          </div>
        </td>
        <td>
          <div className="text-[#737373] text-center text-base py-3 md:py-6 ">
            <span>{scholarship?.applicationFees}$</span>
          </div>
        </td>

        {/* action butoon */}
        <th>
          <button
            onClick={() => handleEditScholarship(scholarship?._id)}
            className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
          >
            <FaEdit></FaEdit>
          </button>
        </th>
        <th>
          <Link to={`/scholarships/${scholarship?._id}`}>
            <button className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700">
              <FcViewDetails></FcViewDetails>
            </button>
          </Link>
        </th>
        <th>
          <button
            title="cancel"
            onClick={() => handleDelete(scholarship._id)}
            className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
          >
            <FaTrashAlt></FaTrashAlt>
          </button>
        </th>
      </tr>
      {
        <UpdateScholarshipModal
          scholarshipId={scholarship._id}
          modal={modal}
          setModal={setModal}
          refetch={refetch}
        ></UpdateScholarshipModal>
      }
    </>
  );
};

export default Scholarship;
