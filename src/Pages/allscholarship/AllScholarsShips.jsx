import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import MainCard from "../Home/TopScholarShip/card/MainCard";
import { Helmet } from "react-helmet-async";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Pagination, Stack } from "@mui/material";

const AllScholarships = () => {
  const [page, setPage] = useState(1);

  const axiosPublic = useAxiosPublic();
  const [searchText, setSearchText] = useState("");
  // get count
  const { data: documentCount = {} } = useQuery({
    queryKey: ["documentCount", searchText],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/scholarship-count?search=${searchText}`
      );
      return res.data;
    },
  });
  //   console.log(documentCount);
  const count = documentCount.count;
  const pageCount = Math.ceil(count / 6);

  //

  // get all schoalrship

  const { data: allScholarships = [], isLoading } = useQuery({
    queryKey: ["allscholarships", searchText, page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/allsholarship?search=${searchText}&page=${page}&size=${6}`
      );
      return res.data;
    },
  });
  console.log(allScholarships);
  // pagination handle page
  const handleChange = (event, value) => {
    setPage(value);
    console.log(page);
  };

  if (isLoading) {
    return <div className="loading-spinner"></div>;
  }
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchText = form.search.value;
    setSearchText(searchText);
    setPage(1);
  };
  console.log(searchText);
  return (
    <div>
      <Helmet>
        <title>AwsScholar | All Scholarships</title>
      </Helmet>
      <div className="pt-[100px] max-w-7xl mx-auto">
        <div>
          <SectionTitle
            heading={"All scholarships"}
            subheading={"<<< find Your Desire >>>"}
          ></SectionTitle>
        </div>
        {/* search Field */}
        <div className=" md:flex md:justify-center text-center mb-2 px-3">
          <div className=" max-w-1/2">
            {" "}
            <form
              onSubmit={handleSearch}
              className="flex justify-between rounded-full border md:w-[500px]  items-center py-2 gap-2 h-[60px]  px-0 mb-3  max-w-1/2"
            >
              <input
                type="text"
                name="search"
                className="appearance-none pl-5 focus:bg-none  h-auto text-xl outline-0 border-0 shadow-none"
                placeholder="Search"
              />
              <button
                type="submit"
                className="btn h-auto btn-primary rounded-full  "
              >
                <FaSearch className="md:h-[60px] md:w-[40px] md:text-3xl"></FaSearch>
              </button>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-7 ">
          {allScholarships.map((item) => (
            <MainCard key={item._id} item={item}></MainCard>
          ))}
        </div>
        <div className="flex justify-center">
          {" "}
          <Stack
            spacing={2}
            sx={{
              fontSize: "400",
              marginBottom: "30px",
            }}
          >
            {/* <Typography>Page: {page}</Typography> */}
            <Pagination
              size="large"
              count={pageCount}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default AllScholarships;
