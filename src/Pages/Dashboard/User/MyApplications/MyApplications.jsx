import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcViewDetails } from "react-icons/fc";
import { MdOutlineRateReview } from "react-icons/md";
import Swal from "sweetalert2";
const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: appliedApplications = [], refetch } = useQuery({
    queryKey: ["appliedApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appliedScholarship/${user?.email}`);
      return res?.data;
    },
  });
  console.log(appliedApplications);
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
          .delete(`/appliedScholarship/${id}`)
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
      <Helmet>Dashboard | My Applications</Helmet>
      <div>
        <SectionTitle
          heading={"applications"}
          subheading={"<<< application that you applied >>>"}
        ></SectionTitle>
      </div>
      <div className="bg-white px-4 md:px-12 py-3 md:py-12">
        <div className="font-Cinzel font-bold flex items-center justify-between ">
          <h2 className=" text-xs md:text-3xl  md:leading-[43px]">
            Total Applied Applications: {appliedApplications.length}
          </h2>
        </div>
        {/* table */}

        <div>
          <div className="overflow-x-auto rounded-t-lg mt-3">
            <table className="table space-y-3 font-Inter rounded-t-lg">
              {/* head */}
              <thead className="bg-[#D1A054] h-auto  py-3 md:py-6">
                <tr className="text-white h-auto rounded-t-2xl py-3 md:py-6 ">
                  <th className="py-4 md:py-6">#</th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    University Name
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Address
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    FeedBack
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Subject
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Applied Degree
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Applications Fee
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Service Charge
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Status
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Action
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Action
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Action
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Add Review
                  </th>
                </tr>
              </thead>
              <tbody>
                {appliedApplications.map((appliedApplication, idx) => (
                  <tr key={user._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="text-[#737373] text-base py-3 md:py-6 ">
                        <span>{appliedApplication?.universityName}</span>
                      </div>
                    </td>
                    <td className="text-[#737373] text-base py-3 md:py-6 ">
                      <span>{appliedApplication?.applicantAddress}</span>
                    </td>
                    <td>
                      <div className="text-[#737373] text-base py-3 md:py-6 ">
                        <span>{appliedApplication?.feedback}</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-[#737373] text-base py-3 md:py-6 ">
                        <span>{appliedApplication?.subjectCategory}</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-[#737373] text-base py-3 md:py-6 ">
                        <span>
                          {appliedApplication?.applicantAspiredDegree}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="text-[#737373] text-base py-3 md:py-6 ">
                        <span>{appliedApplication?.applicationFees}</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-[#737373] text-base py-3 md:py-6 ">
                        <span>{appliedApplication?.serviceCharge}</span>
                      </div>
                    </td>
                    <td>
                      <div className=" text-sm font-bold text-yellow-600 py-3 md:py-6 ">
                        <span>{appliedApplication?.applicationStatus}</span>
                      </div>
                    </td>

                    {/* <td className="text-[#737373] text-base">
                      {user?.role ? (
                        `${user?.role}`
                      ) : (
                        <>
                          <button
                            // onClick={() => handleMakeAdmin(user)}
                            className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-[#D1A054]"
                          >
                            <FaUsers></FaUsers>
                          </button>
                        </>
                      )}{" "}
                    </td> */}
                    {/* action butoon */}
                    <th>
                      <button
                        // onClick={() => handleDelete(user._id)}
                        className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
                      >
                        <FaEdit></FaEdit>
                      </button>
                    </th>
                    <th>
                      <button className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700">
                        <FcViewDetails></FcViewDetails>
                      </button>
                    </th>
                    <th>
                      <button
                        title="cancel"
                        onClick={() => handleDelete(appliedApplication._id)}
                        className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
                      >
                        <FaTrashAlt></FaTrashAlt>
                      </button>
                    </th>
                    {/* add review */}
                    <th>
                      <button
                        title="Add a review"
                        // onClick={() => handleDelete(user._id)}
                        className="btn btn-ghost text-3xl text-white flex justify-center items-center bg-red-700"
                      >
                        <MdOutlineRateReview></MdOutlineRateReview>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
