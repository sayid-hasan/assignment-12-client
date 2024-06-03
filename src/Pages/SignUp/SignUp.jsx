import img1 from "../../assets/Images/RegPage.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

import SococialLogin from "../../Components/SococialLogin/SococialLogin";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignUp = () => {
  const { createUser, updateUser } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const { email, password, name, photourl } = data;
    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        updateUser(name, photourl).then(() => {
          // create user entry in database
          const userInfo = {
            name,
            email,
          };
          console.log(userInfo);
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top",
                icon: "success",
                title: "sign up successfully",
                showConfirmButton: false,
                timer: 1500,
              });

              navigate("/");
              window.location.reload();
            } else if (res.data.message) {
              Swal.fire({
                position: "top",
                icon: "error",
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500,
              });

              navigate("/");
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
        reset();
        Swal.fire({
          position: "top",
          icon: "error",

          title: err,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      });
  };
  return (
    <div>
      <Helmet>
        <title>AweScholars | sign up</title>
      </Helmet>
      <div className="hero min-h-screen background">
        <div className="background box-shadow  flex justify-center items-center max-w-6xl md:px-10">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className=" md:w-1/2 w-full ">
              <img src={img1} alt="" />
            </div>
            <div className="card shrink-0 md:w-1/2 w-full max-w-sm  bg-none">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body gap-1 font-Inter"
              >
                <h2 className="font-Inter font-bold text-center text-[32px] text-[#151515]">
                  Sign Up
                </h2>
                {/* name */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-[#444444] label-text text-lg font-medium">
                      Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    {...register("name", { required: true })}
                    placeholder="your Name"
                    className="input input-bordered placeholder:text-[#A1A1A1]"
                  />
                  {errors.name?.type === "required" && (
                    <span className="text-red-600 font-medium text-sm">
                      name is required
                    </span>
                  )}
                </div>
                {/* photoUrl */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-[#444444] label-text text-lg font-medium">
                      Photo URL
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    {...register("photourl", { required: true })}
                    placeholder="your Name"
                    className="input input-bordered placeholder:text-[#A1A1A1]"
                  />
                  {errors.photourl?.type === "required" && (
                    <span className="text-red-600 font-medium text-sm">
                      Photo URL is required
                    </span>
                  )}
                </div>
                {/* email */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="text-[#444444] label-text text-lg font-medium">
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email", { required: true })}
                    placeholder="your email"
                    className="input input-bordered placeholder:text-[#A1A1A1]"
                    required
                  />
                  {errors.email?.type === "required" && (
                    <span className="text-red-600 font-medium text-sm">
                      Email is required
                    </span>
                  )}
                </div>
                {/* pass */}
                <div className="form-control  w-full">
                  <label className="label">
                    <span className="text-[#444444] label-text text-lg font-medium">
                      Password
                    </span>
                  </label>
                  <div className="relative flex  w-full">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Enter Your password"
                      {...register("password", {
                        required: true,
                        pattern:
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                        minLength: 6,
                      })}
                      name="password"
                      className="input grow  input-bordered placeholder:text-[#A1A1A1]"
                    />

                    <div
                      onClick={() => setShowPass(!showPass)}
                      className="absolute top-1/2 -translate-y-1/2  right-2  text-2xl"
                    >
                      {showPass ? (
                        <MdVisibilityOff></MdVisibilityOff>
                      ) : (
                        <MdVisibility></MdVisibility>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  {" "}
                  {errors.password?.type === "required" && (
                    <span className="text-red-600 font-medium text-sm">
                      Password is required
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-600 font-medium text-sm">
                      Password must be 6 character
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-600 font-medium text-sm">
                      Password must have one Uppercase , one lower case , one
                      degit, one special character
                    </span>
                  )}
                </div>

                <div className="form-control mt-6 w-full">
                  <input
                    className="btn btn-primary border-none text-white bg-[#D1A054B3] text-xl font-bold"
                    type="submit"
                    value={"Sign Up"}
                  />
                </div>
              </form>
              <p className="font-medium text-lg -mt-3 text-[#D1A054B3] text-center mb-3">
                alredy have an account ? <Link to="/login">Sign in</Link>
              </p>
              <div className="text-center   space-x-1">
                <p className="px-3 text-lg -mt-3 font-medium text-[#444444]">
                  or Login with
                </p>
                <SococialLogin></SococialLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
