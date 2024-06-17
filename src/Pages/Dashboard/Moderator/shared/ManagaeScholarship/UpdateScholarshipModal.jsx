import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { IKContext, IKUpload } from "imagekitio-react";
import moment from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const UpdateScholarshipModal = ({
  modal,
  scholarshipId,
  refetch,
  setModal,
}) => {
  console.log(scholarshipId);

  const axiosSecure = useAxiosSecure();

  // react form hook
  const { register, handleSubmit } = useForm();
  const [imageUrl, setImageUrl] = useState(null);
  // get authentication params for image uplaod in imagekit from server
  const authenticator = async () => {
    try {
      // You can also pass headers and validate the request source in the backend, or you can use headers for any other use case.

      const response = await fetch("http://localhost:5500/get-signature");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      console.log(data);
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };
  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setImageUrl(res?.url);
  };

  // get data for display
  const { data: scholarship = {} } = useQuery({
    queryKey: ["schoalrship"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${scholarshipId}`);
      return res?.data;
    },
  });

  //   console.log(scholarship);
  const {
    scholarshipName,
    universityName,
    // universityImage,
    universityCountry,
    universityCity,
    universityWorldRank,
    subjectCategory,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationFees,
    serviceCharge,
    applicationDeadline,

    ScholarshipDetailsField,
    _id,
    stipend,
  } = scholarship;
  const [deadline, setDeadline] = useState(moment(applicationDeadline));
  //   console.log(deadline._i);
  //   getdata from onsubmit\
  const onSubmit = async (data) => {
    const {
      scholarshipName,
      universityName,

      universityCountry,
      universityCity,
      universityWorldRank,
      subjectCategory,
      scholarshipCategory,
      degree,
      tuitionFees,
      applicationFees,
      serviceCharge,

      ScholarshipDetailsField,

      stipend,
    } = data;
    // console.log(data);
    console.log(imageUrl);
    const updatedData = {
      scholarshipName,
      universityName,
      imageUrl,
      universityCountry,
      universityCity,
      universityWorldRank,
      subjectCategory,
      scholarshipCategory,
      degree,
      tuitionFees,
      applicationFees,
      serviceCharge,
      applicationDeadline: deadline,

      ScholarshipDetailsField,

      stipend,
    };
    console.log(updatedData);
    //   update data on database as schoalrship
    try {
      const res = await axiosSecure.patch(`/scholarships/${_id}`, updatedData);
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
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
        icon: "error",
        title: "Facing error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
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
            <div className="relative p-2 w-full max-w-full max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 text-center w-full dark:text-white">
                    Update Scholarship
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
                  className="flex items-center flex-col w-full "
                >
                  <div className="grid items-center gap-4 mb-4 grid-cols-2">
                    {/* Scholarship name */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="scholarshipName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Scholarship Name
                      </label>
                      <input
                        type="text"
                        name="scholarshipName"
                        id="scholarshipName"
                        defaultValue={scholarshipName}
                        {...register("scholarshipName")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type Your mobile no"
                      />
                    </div>
                    {/*  and photo */}
                    {/* ikimage upload */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="photo"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Scholarship Image
                      </label>
                      <IKContext
                        publicKey={"public_T4zX45oipeTjSumsrvipza8t/Lo="}
                        urlEndpoint={"https://ik.imagekit.io/sayidImage34"}
                        authenticator={authenticator}
                      >
                        <IKUpload
                          required={true}
                          onError={onError}
                          onSuccess={onSuccess}
                          useUniqueFileName={true}
                          isPrivateFile={false}
                        />
                      </IKContext>
                    </div>
                    {/* address */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="universityCountry"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        name="universityCountry"
                        id="universityCountry"
                        defaultValue={universityCountry}
                        {...register("universityCountry")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="universityCity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="universityCity"
                        id="universityCity"
                        defaultValue={universityCity}
                        {...register("universityCity")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                        required=""
                      />
                    </div>

                    {/* World Rank*/}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="universityWorldRank"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        World Rank
                      </label>
                      <input
                        type="text"
                        name="universityWorldRank"
                        id="universityWorldRank"
                        defaultValue={universityWorldRank}
                        {...register("universityWorldRank")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                        required=""
                      />
                    </div>
                    {/* applying degree dropdown*/}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="degree"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Degree
                      </label>
                      <select
                        id="degree"
                        {...register("degree")}
                        defaultValue={degree}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value={""}>Select Degree</option>
                        <option value="diploma">Diploma</option>
                        <option value="bachelor">Bachelor</option>
                        <option value="masters">Masters</option>
                      </select>
                    </div>
                    {/* Fees  */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="tuitionFees"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tution Fee
                      </label>
                      <input
                        type="text"
                        name="tuitionFees"
                        id="tuitionFees"
                        defaultValue={tuitionFees}
                        {...register("tuitionFees")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                        required=""
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="applicationFees"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Application Fee
                      </label>
                      <input
                        type="text"
                        name="applicationFees"
                        id="applicationFees"
                        defaultValue={applicationFees}
                        {...register("applicationFees")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                        required=""
                      />
                    </div>
                    {/* Service Charge  */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="serviceCharge"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Service Charge
                      </label>
                      <input
                        type="text"
                        name="serviceCharge"
                        id="serviceCharge"
                        defaultValue={serviceCharge}
                        {...register("serviceCharge")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                        required=""
                      />
                    </div>
                    {/* application DeadLine*/}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="serviceCharge"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Application Deadline
                      </label>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer
                          components={["DatePicker", "DatePicker"]}
                        >
                          <DatePicker
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            value={moment(deadline)}
                            onChange={(newValue) => {
                              setDeadline(moment(newValue).format("L"));
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>

                    {/* University name  */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="universityName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        University Name
                      </label>
                      <input
                        type="text"
                        defaultValue={universityName}
                        {...register("universityName")}
                        name="universityName"
                        id="universityName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="xyz"
                      />
                    </div>
                    {/* schoalrship categroy*/}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="scholarshipCategory"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Schoalrship Category
                      </label>
                      <input
                        type="text"
                        name="scholarshipCategory"
                        defaultValue={scholarshipCategory}
                        {...register("scholarshipCategory")}
                        id="scholarshipCategory"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                      />
                    </div>
                    {/* subject categroy  */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="subjectCategory"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Subject Category
                      </label>
                      <input
                        type="text"
                        name="subjectCategory"
                        defaultValue={subjectCategory}
                        {...register("subjectCategory")}
                        id="subjectCategory"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                      />
                    </div>
                    {/* stipend */}

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="stipend"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Stipend
                      </label>
                      <input
                        type="text"
                        name="stipend"
                        id="stipend"
                        defaultValue={stipend}
                        {...register("stipend")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                        required=""
                      />
                    </div>
                    {/* details */}
                    <div className="col-span-2">
                      <label
                        htmlFor="ScholarshipDetailsField"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Scholarship Details
                      </label>
                      <textarea
                        id="ScholarshipDetailsField"
                        rows="4"
                        name="ScholarshipDetailsField"
                        defaultValue={ScholarshipDetailsField}
                        {...register("ScholarshipDetailsField")}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write product description here"
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
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UpdateScholarshipModal;
