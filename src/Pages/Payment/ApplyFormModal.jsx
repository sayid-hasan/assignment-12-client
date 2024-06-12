import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { IKContext, IKUpload } from "imagekitio-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplyFormModal = ({
  modal,
  scholarshipId,
  universityName,
  scholarshipCategory,
  subjectCategory,
  setModal,
  applicationFees,
  serviceCharge,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  //   console.log(user);
  // react form hook
  const {
    register,
    handleSubmit,

    // reset,
    formState: { errors },
  } = useForm();
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
    setImageUrl(res.url);
  };
  // getdata from onsubmit
  const onSubmit = async (data) => {
    const {
      applicantPhone,

      applicantAddress,
      applicantGender,
      applicantAspiredDegree,
      applicantSscResult,
      applicantHscResult,
      applicantStudyGap,
    } = data;
    console.log(imageUrl);
    const appliedScholarshipData = {
      applicantPhone,
      imageUrl,
      applicationStatus: "pending",
      applicantAddress,
      applicantGender,
      applicantAspiredDegree,
      applicantSscResult,
      applicantHscResult,
      applicationFees,
      serviceCharge,
      applicantStudyGap,
      universityName,
      scholarshipCategory,
      subjectCategory,
      userEmail: user.email,
      userName: user.displayName,
      scholarshipId,
      currentDate: new Date(),
    };
    console.log(appliedScholarshipData);
    //   save data on database as appliedScholarships
    try {
      const res = await axiosPublic.post(
        "/appliedScholarship",
        appliedScholarshipData
      );
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("successfully applied");
        navigate("/");
        setModal(false);
      }
    } catch (err) {
      console.log(err);
      toast.warn(
        ` ${applicantPhone} applicant already applied for this. try another one `
      );
    }
  };
  return (
    <>
      {modal && (
        <div className="flex justify-end w-full">
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
                    Applicant Details
                  </h3>
                  {/* close button to do set setmodal false */}
                  <button
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
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    {/* phone */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        {...register("applicantPhone", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type Your mobile no"
                        required=""
                      />
                      {errors.applicantPhone?.type === "required" && (
                        <span className="text-red-600 font-medium text-sm">
                          Phone is required
                        </span>
                      )}
                    </div>
                    {/*  and photo */}

                    {/* ikimage upload */}

                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="photo"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        photo
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
                    {/* 
                    normal uplaod
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="image"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        {...register("image", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="$2999"
                        required=""
                      />
                      {errors.image?.type === "required" && (
                        <span className="text-red-600 font-medium text-sm">
                          Image is required
                        </span>
                      )}
                    </div> */}
                    {/* address */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        {...register("applicantAddress", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                        required=""
                      />
                      {errors.applicantAddress?.type === "required" && (
                        <span className="text-red-600 font-medium text-sm">
                          Address is required
                        </span>
                      )}
                    </div>
                    {/* gender dropdown*/}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="gender"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Gender
                      </label>
                      <select
                        defaultValue={""}
                        id="gender"
                        {...register("applicantGender", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option selected="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                      </select>
                      {errors.applicantGender?.type === "required" && (
                        <span className="text-red-600 font-medium text-sm">
                          Gender is required
                        </span>
                      )}
                    </div>
                    {/* applying degree dropdown*/}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="degree"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Applaying for
                      </label>
                      <select
                        id="degree"
                        {...register("applicantAspiredDegree", {
                          required: true,
                        })}
                        defaultValue={""}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option selected="">Select Degree</option>
                        <option value="diploma">Diploma</option>
                        <option value="bachelor">Bachelor</option>
                        <option value="masters">Masters</option>
                      </select>
                      {errors.applicantAspiredDegree?.type === "required" && (
                        <span className="text-red-600 font-medium text-sm">
                          Degree is required
                        </span>
                      )}
                    </div>
                    {/* ssc result  */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="sscResult"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        SSC
                      </label>
                      <input
                        type="text"
                        {...register("applicantSscResult", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="5.00"
                      />
                      {errors.applicantSscResult?.type === "required" && (
                        <span className="text-red-600 font-medium text-sm">
                          SSC result is required
                        </span>
                      )}
                    </div>
                    {/* hsc result  */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="hscResult"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        HSC
                      </label>
                      <input
                        type="text"
                        {...register("applicantHscResult", { required: true })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="5.00"
                      />
                      {errors.applicantHscResult?.type === "required" && (
                        <span className="text-red-600 font-medium text-sm">
                          HSC result is required
                        </span>
                      )}
                    </div>
                    {/* study gap dropdown*/}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="studyGap"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Study Gap
                      </label>
                      <select
                        defaultValue={""}
                        id="studyGap"
                        {...register("applicantStudyGap")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option selected="">Select gap</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Year</option>
                        <option value="3">3 Year</option>
                        <option value="4">4 Year</option>
                      </select>
                    </div>
                    {/* University name readonlyS */}
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="universityName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        University Name
                      </label>
                      <input
                        type="text"
                        name="universityName"
                        id="universityName"
                        value={universityName}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                        readOnly
                      />
                    </div>
                    {/* schoalrship categroy readonlyS */}
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
                        id="scholarshipCategory"
                        value={scholarshipCategory}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                        readOnly
                      />
                    </div>
                    {/* subject categroy readonlyS */}
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
                        id="subjectCategory"
                        value={subjectCategory}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="village,city,country"
                        readOnly
                      />
                    </div>

                    {/* <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Description
                      </label>
                      <textarea
                        id="description"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write product description here"
                      ></textarea>
                    </div> */}
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
                    Apply
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

export default ApplyFormModal;
