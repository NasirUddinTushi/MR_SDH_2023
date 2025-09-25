import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/schemas/auth.schemas';
import { useResetPassword } from '@/hooks/auth.hook';
import authImg from '../../assets/images/authImg.png';
import logo from '../../assets/images/logoMain.png';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || '';

    const { form, mutate, isPending } = useResetPassword();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = form;

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Set email from URL params if available
    React.useEffect(() => {
        if (email) {
            setValue('email', email);
        }
    }, [email, setValue]);

    const onSubmit = (data) => {
        mutate(data);
        console.log('reset password payload:', data);
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
                    alt="Reset password visual"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Form */}
            <div className="flex items-center justify-center px-6 lg:px-12 py-12 overflow-auto">
                <div className="w-full md:max-w-[90%]">
                    <h1 className="text-[#3D4040] text-center font-[NotoSans] text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-semibold leading-tight mb-2">
                        Reset Password
                    </h1>
                    <p className="mt-4 text-[rgba(61,_64,_64,_0.60)] text-center font-[Inter] text-[15px] md:text-[16px] leading-[28px] mb-6">
                        Enter your email, OTP, and new password to reset your account password.
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

                        {/* OTP */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] font-semibold leading-[24px]">
                                OTP Code *
                            </label>
                            <input
                                type="text"
                                placeholder="Enter 4-digit OTP"
                                maxLength="4"
                                className="w-full p-3 border rounded-[16px] border-[#C4C4C4] bg-inherit text-center text-lg tracking-widest"
                                {...register("otp")}
                            />
                            {errors.otp && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.otp.message}
                                </p>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="flex flex-col gap-1.5 relative">
                            <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] font-semibold leading-[24px]">
                                New Password *
                            </label>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                className="w-full p-3 border rounded-[16px] border-[#C4C4C4] bg-inherit pr-10"
                                {...register("new_password")}
                            />
                            {errors.new_password && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.new_password.message}
                                </p>
                            )}
                            <span
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            >
                                {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-1.5 relative">
                            <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] font-semibold leading-[24px]">
                                Confirm New Password *
                            </label>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm New Password"
                                className="w-full p-3 border rounded-[16px] border-[#C4C4C4] bg-inherit pr-10"
                                {...register("confirm_password")}
                            />
                            {errors.confirm_password && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.confirm_password.message}
                                </p>
                            )}
                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                            >
                                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className={`w-full bg-[#3D4040] text-white py-3 rounded-lg hover:bg-gray-800 transition ${isPending ? "opacity-60 cursor-not-allowed" : ""
                                }`}
                        >
                            {isPending ? "Resetting Password..." : "Reset Password"}
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

export default ResetPassword;
