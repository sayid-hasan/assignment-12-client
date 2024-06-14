import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../Components/SectionTitle/SectionTitle";
import MyReviewTable from "./MyReviewTable";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myReviews = [] } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myreviews/${user?.email}`);
      return res?.data;
    },
  });
  console.log(myReviews);
  return (
    <div>
      <div>
        <Helmet>Dashboard | My Reviews</Helmet>
        <div>
          <SectionTitle
            heading={"Reviews"}
            subheading={"<<< manage all your Reviews >>>"}
          ></SectionTitle>
        </div>
        <div className="bg-white px-4 md:px-12 py-3 md:py-12">
          <div className="font-Cinzel font-bold flex items-center justify-between ">
            <h2 className=" text-xs md:text-3xl  md:leading-[43px]">
              Total Review: {myReviews.length}
            </h2>
          </div>

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
                    Review Comment
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Review Date
                  </th>

                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Action
                  </th>
                  <th className="text-base uppercase font-semibold leading-[19px]">
                    Action
                  </th>
                </tr>
              </thead>
              {myReviews.map((review, idx) => (
                <MyReviewTable
                  key={review._id}
                  idx={idx}
                  review={review}
                ></MyReviewTable>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
