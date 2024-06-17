import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";
import UpdateScholarshipModal from "./UpdateScholarshipModal";

const Scholarship = ({ scholarship, idx, refetch }) => {
  const [modal, setModal] = useState(false);
  const handleEditScholarship = () => {
    setModal(true);
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
            // onClick={() => handleDelete(appliedApplication._id)}
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
