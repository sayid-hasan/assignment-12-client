import "./login.css";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import img1 from "../../assets/Images/loginPage.jpg";
import { useContext, useEffect, useRef, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import SococialLogin from "../../Components/SococialLogin/SococialLogin";
import { useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
// import SococialLogin from "../../components/SococialLogin/SococialLogin";
const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const captchaRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext);
  const from = location.state?.from?.pathname || "/";
  const [showPass, setShowPass] = useState(false);
  // react form hook
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(data);
    logIn(email, password)
      .then((res) => {
        console.log(res.user);

        Swal.fire({
          position: "top",
          icon: "success",
          title: res.user?.displayName
            ? ` 'Welcome Back' ${res.user?.displayName}`
            : "logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
      })
      .catch((err) => console.log(err));
  };
  const handleCaptcha = () => {
    const userCaptcha = captchaRef.current.value;

    if (validateCaptcha(userCaptcha) == true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <div>
      <Helmet>
        <title>AweScholars | Log In</title>
      </Helmet>
      <div className="hero min-h-screen ">
        <div className="   flex justify-center items-center max-w-6xl md:px-10">
          <div className="hero-content flex-col lg:flex-row">
            <div className=" md:w-1/2 w-full ">
              <img src={img1} alt="" />
            </div>
            <div className="card shrink-0 md:w-1/2 w-full max-w-sm  bg-none">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body gap-1 font-Inter"
              >
                <h2 className="font-Cinzel font-bold text-center text-[32px] text-[#151515]">
                  Login
                </h2>
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
                <div className="form-control  w-full">
                  {/* pass */}

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

                  {/* error handling */}
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
                </div>
                {/* captcha */}
                <div className="form-control  w-full">
                  <div className="label ">
                    <span className="text-[#444444]  label-text text-base font-medium ">
                      <LoadCanvasTemplate />
                    </span>
                  </div>
                  <input
                    type="text"
                    onBlur={handleCaptcha}
                    placeholder="Enter the captcha"
                    name="captcha"
                    ref={captchaRef}
                    className="input input-bordered placeholder:text-[#A1A1A1]"
                  />
                </div>
                <div className="form-control mt-6 w-full">
                  <input
                    // disabled={disabled} todo : enabled it before publish
                    className="btn btn-primary border-none text-white bg-[#FF7F46] text-xl font-bold"
                    type="submit"
                    value={"Login"}
                  />
                </div>
              </form>
              <p className="font-medium text-lg font-Cinzel -mt-3 text-[#FF7F46] text-center mb-3">
                New here ? Create a{" "}
                <Link className="font-bold mx-3" to="/signup">
                  {" "}
                  new Account
                </Link>
              </p>
              <div className="text-center   space-x-1">
                <p className="px-3 text-lg -mt-3 font-medium text-[#444444]">
                  or Login with
                </p>
                {/* social login    */}
                <SococialLogin></SococialLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
