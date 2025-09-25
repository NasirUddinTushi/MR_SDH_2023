import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import authImg from '../../assets/images/authImg.png';
import logo from '../../assets/images/logoMain.png';
import { useSignUp } from '@/hooks/auth.hook';

const SignUp = () => {
  const { form, mutate, isPending } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const onSubmit = (data) => {
    if (!agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    mutate(data);
    console.log('sign up payload:', data);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative bg-white">
      {/* Top Right Logo */}
      <Link to="/" className="absolute top-4 right-4 z-50">
        <img src={logo} alt="Logo" className="w-28 md:w-36" />
      </Link>

      {/* Left Image */}
      <div className="hidden md:block h-full">
        <img
          src={authImg}
          alt="Signup visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center px-6 lg:px-12 py-12 overflow-auto">
        <div className="w-full md:max-w-[90%]">
          <h1 className="text-[#3D4040] text-center font-[NotoSans] text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-semibold leading-tight mb-2">
            Create Your Account
          </h1>
          <p className="mt-4 text-[rgba(61,_64,_64,_0.60)] text-center font-[Inter] text-[15px] md:text-[16px] leading-[28px] mb-6">
            Join our platform to start your consulting journey. Book sessions,
            access resources, and connect with our expert team in all one place.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] font-semibold leading-[24px]">
                Name *
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border rounded-[16px] border-[#C4C4C4] bg-inherit"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] font-semibold leading-[24px]">
                Email *
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 border rounded-[16px] border-[#C4C4C4] bg-inherit"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] font-semibold leading-[24px]">
                Phone Number *
              </label>
              <input
                type="text"
                placeholder="+8801XXXXXXXXX"
                className="w-full p-3 border rounded-[16px] border-[#C4C4C4] bg-inherit"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] font-semibold leading-[24px]">
                Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full p-3 border rounded-[16px] border-[#C4C4C4] bg-inherit pr-10"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] font-semibold leading-[24px]">
                Confirm Password *
              </label>
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="w-full p-3 border rounded-[16px] border-[#C4C4C4] bg-inherit pr-10"
                {...register("confirm_password")}
              />
              {errors.confirm_password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showConfirm ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* Checkbox */}
            <label className="flex items-start text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] not-italic font-normal leading-[24px] gap-2 mt-2">
              <input
                type="checkbox"
                className="mt-1"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span>
                By signing up, you agree to our{' '}
                <a
                  href="#"
                  className="underline [text-decoration-style:solid] [text-decoration-skip-ink:none] [text-underline-offset:auto] [text-underline-position:from-font] hover:underline text-[#3D4040] text-center font-[Inter] text-[15px] md:text-[16px] not-italic font-medium leading-[24px]"
                >
                  Terms of services
                </a>{' '}
                &{' '}
                <a
                  href="#"
                  className="underline [text-decoration-style:solid] [text-decoration-skip-ink:none] [text-underline-offset:auto] [text-underline-position:from-font] hover:underline text-[#3D4040] text-center font-[Inter] text-[15px] md:text-[16px] not-italic font-medium leading-[24px]"
                >
                  Privacy policy
                </a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className={`w-full bg-[#3D4040] text-white py-3 rounded-lg hover:bg-gray-800 transition ${isPending ? "opacity-60 cursor-not-allowed" : ""
                }`}
            >
              {isPending ? "Creating Account..." : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Button */}
          <button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
              >
                <g clip-path="url(#clip0_16991_1535)">
                  <path
                    d="M5.81891 14.5027L4.9835 17.6213L1.93011 17.6859C1.01759 15.9934 0.5 14.057 0.5 11.9992C0.5 10.0093 0.983938 8.13277 1.84175 6.48047H1.84241L4.56078 6.97884L5.75159 9.68091C5.50236 10.4075 5.36652 11.1875 5.36652 11.9992C5.36661 12.88 5.52617 13.724 5.81891 14.5027Z"
                    fill="#FBBB00"
                  />
                  <path
                    d="M24.2921 9.75781C24.43 10.4837 24.5018 11.2334 24.5018 11.9996C24.5018 12.8587 24.4115 13.6967 24.2394 14.5051C23.6553 17.2558 22.1289 19.6578 20.0144 21.3576L20.0137 21.3569L16.5898 21.1822L16.1052 18.1572C17.5083 17.3343 18.6048 16.0466 19.1823 14.5051H12.7656V9.75781H24.2921Z"
                    fill="#518EF8"
                  />
                  <path
                    d="M20.0114 21.3577L20.0121 21.3584C17.9556 23.0113 15.3433 24.0004 12.4996 24.0004C7.92969 24.0004 3.95652 21.4461 1.92969 17.6872L5.81848 14.5039C6.83187 17.2085 9.44089 19.1338 12.4996 19.1338C13.8143 19.1338 15.046 18.7784 16.1029 18.158L20.0114 21.3577Z"
                    fill="#28B446"
                  />
                  <path
                    d="M20.1577 2.76262L16.2702 5.94525C15.1763 5.26153 13.8833 4.86656 12.4981 4.86656C9.37017 4.86656 6.71236 6.88017 5.74973 9.68175L1.8405 6.48131H1.83984C3.837 2.63077 7.86028 0 12.4981 0C15.4097 0 18.0794 1.03716 20.1577 2.76262Z"
                    fill="#F14336"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_16991_1535">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            Continue with Google
          </button>

          {/* Redirect to Login */}
          <p className="text-[#3D4040] text-center font-[Inter] text-[15px] md:text-[16px] not-italic font-normal leading-[24px] mt-6 flex items-center justify-center gap-1.5">
            Already have an account?
            <Link
              to="/sign-in"
              className=" underline [text-decoration-style:solid] [text-decoration-skip-ink:none] [text-underline-offset:auto] [text-underline-position:from-font] hover:underline text-[#3D4040] text-center font-[Inter] text-[15px] md:text-[16px] not-italic font-medium leading-[24px]"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
