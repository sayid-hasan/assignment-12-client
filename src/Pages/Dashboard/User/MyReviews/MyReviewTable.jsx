import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MyReviewTable = ({ review, idx }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(review?.reviewDate);
  const reviewDate = date.toLocaleDateString("en-GB", options);
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
              // onClick={() => handleDelete(appliedApplication._id)}
              className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
            >
              <FaTrashAlt></FaTrashAlt>
            </button>
          </th>
          {/* edit button */}
          <th>
            <button
              // onClick={() =>
              // //   handleEditScholarship(appliedApplication?.scholarshipId)
              // }
              className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
            >
              <FaEdit></FaEdit>
            </button>
          </th>
        </tr>
      </tbody>
    </>
  );
};

export default MyReviewTable;
