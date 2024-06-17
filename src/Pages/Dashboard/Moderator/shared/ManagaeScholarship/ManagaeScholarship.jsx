import SectionTitle from "../../../../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import Scholarship from "./Scholarship";

const ManagaeScholarship = () => {
  // get all schoalrship
  const axiosPublic = useAxiosPublic();

  const {
    data: allScholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allscholarships"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/allsholarship`);
      return res.data;
    },
  });
  console.log(allScholarships);
  if (isLoading) {
    return <div className="loading-spinner"></div>;
  }
  return (
    <div className="container mx-auto">
      <Helmet>Dashboard | Manage Scholarships</Helmet>
      <div>
        <SectionTitle
          heading={"Scholarships"}
          subheading={"<<< All Scholarships >>>"}
        ></SectionTitle>
      </div>
      <div className="bg-white px-4 md:px-12 py-3 md:py-12">
        <div className="font-Cinzel font-bold flex items-center justify-between ">
          <h2 className=" text-xs md:text-3xl  md:leading-[43px]">
            Total ScholarShips: {allScholarships?.length}
          </h2>
        </div>
        {/* table */}

        <div className="w-full">
          <div className="overflow-scroll md:overflow-y-auto md:overflow-x-auto max-w-[350px]  md:max-w-full rounded-t-lg mt-3">
            <table className="table space-y-3 font-Inter rounded-t-lg">
              {/* head */}
              <thead className="bg-[#D1A054] h-auto  py-3 md:py-6">
                <tr className="text-white h-auto rounded-t-2xl py-3 md:py-6 ">
                  <th className="py-4 md:py-6">#</th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Schoalarship Name
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    University Name
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Subject Category
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Applied Degree
                  </th>

                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Applications Fee
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
                </tr>
              </thead>
              <tbody>
                {allScholarships.map((scholarship, idx) => (
                  <Scholarship
                    key={scholarship._id}
                    scholarship={scholarship}
                    idx={idx}
                    refetch={refetch}
                  ></Scholarship>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ManagaeScholarship;
