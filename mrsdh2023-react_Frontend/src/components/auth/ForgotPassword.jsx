import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '@/schemas/auth.schemas';
import { useForgotPassword } from '@/hooks/auth.hook';
import authImg from '../../assets/images/authImg.png';
import logo from '../../assets/images/logoMain.png';

const ForgotPassword = () => {
    const { form, mutate, isPending } = useForgotPassword();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const onSubmit = (data) => {
        mutate(data);
        console.log('forgot password payload:', data);
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
                    alt="Forgot password visual"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Form */}
            <div className="flex items-center justify-center px-6 lg:px-12 py-12 overflow-auto">
                <div className="w-full md:max-w-[90%]">
                    <h1 className="text-[#3D4040] text-center font-[NotoSans] text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-semibold leading-tight mb-2">
                        Forgot Password?
                    </h1>
                    <p className="mt-4 text-[rgba(61,_64,_64,_0.60)] text-center font-[Inter] text-[15px] md:text-[16px] leading-[28px] mb-6">
                        Don't worry! Enter your email address and we'll send you an OTP to reset your password.
                    </p>

                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] font-semibold leading-[24px]">
                                Email Address *
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

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className={`w-full bg-[#3D4040] text-white py-3 rounded-lg hover:bg-gray-800 transition ${isPending ? "opacity-60 cursor-not-allowed" : ""
                                }`}
                        >
                            {isPending ? "Sending OTP..." : "Send OTP"}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="mt-6 text-center">
                        <p className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] not-italic font-normal leading-[24px]">
                            Remember your password?{' '}
                            <Link
                                to="/sign-in"
                                className="underline [text-decoration-style:solid] [text-decoration-skip-ink:none] [text-underline-offset:auto] [text-underline-position:from-font] hover:underline text-[#3D4040] text-center font-[Inter] text-[15px] md:text-[16px] not-italic font-medium leading-[24px]"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
