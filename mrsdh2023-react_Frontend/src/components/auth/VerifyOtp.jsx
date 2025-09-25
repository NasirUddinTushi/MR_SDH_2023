import React, { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyOtpSchema } from '@/schemas/auth.schemas';
import { useVerifyOtp } from '@/hooks/auth.hook';
import authImg from '../../assets/images/authImg.png';
import logo from '../../assets/images/logoMain.png';

const VerifyOtp = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get('email') || '';

    const { form, mutate, isPending } = useVerifyOtp();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = form;

    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];

    // Set email from URL params if available
    useEffect(() => {
        if (email) {
            setValue('email', email);
        }
    }, [email, setValue]);

    // Update form value when OTP changes
    useEffect(() => {
        const otpString = otp.join('');
        setValue('otp', otpString);
    }, [otp, setValue]);

    const handleOtpChange = (index, value) => {
        // Only allow digits
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }

        // Handle paste
        if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            navigator.clipboard.readText().then(text => {
                const digits = text.replace(/\D/g, '').slice(0, 4);
                const newOtp = digits.split('').concat(['', '', '', '']).slice(0, 4);
                setOtp(newOtp);

                // Focus the last filled input or next empty one
                const lastIndex = Math.min(digits.length, 3);
                inputRefs[lastIndex].current?.focus();
            });
        }
    };

    const onSubmit = (data) => {
        mutate(data, {
            onSuccess: (response) => {
                // If OTP verification is successful, redirect to reset password page
                if (response?.status === 200 || response?.success === true || response?.code === 200) {
                    navigate(`/reset-password?email=${encodeURIComponent(data.email)}&otp=${data.otp}`);
                }
            }
        });
        console.log('verify otp payload:', data);
    };

    const handleResendOtp = () => {
        // You can implement resend OTP functionality here
        // For now, just show a message
        alert('OTP resent to your email address');
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
                    alt="OTP verification visual"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Form */}
            <div className="flex items-center justify-center px-6 lg:px-12 py-12 overflow-auto">
                <div className="w-full md:max-w-[90%]">
                    <h1 className="text-[#3D4040] text-center font-[NotoSans] text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px] font-semibold leading-tight mb-2">
                        Verify OTP
                    </h1>
                    <p className="mt-4 text-[rgba(61,_64,_64,_0.60)] text-center font-[Inter] text-[15px] md:text-[16px] leading-[28px] mb-6">
                        We've sent a 4-digit verification code to your email address. Please enter it below to continue.
                    </p>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Email (Hidden input) */}
                        <input
                            type="hidden"
                            {...register("email")}
                        />

                        {/* Email Display */}
                        {email && (
                            <div className="text-center">
                                <p className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] font-medium">
                                    Code sent to: <span className="font-semibold">{email}</span>
                                </p>
                            </div>
                        )}

                        {/* OTP Input */}
                        <div className="flex flex-col gap-3">
                            <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] font-semibold leading-[24px] text-center">
                                Enter 4-Digit Code
                            </label>

                            <div className="flex justify-center gap-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="w-14 h-14 text-center text-2xl font-bold border-2 rounded-lg border-[#C4C4C4] bg-inherit focus:border-[#3D4040] focus:outline-none transition-colors"
                                        placeholder="0"
                                    />
                                ))}
                            </div>

                            {/* Hidden input for form validation */}
                            <input
                                type="hidden"
                                {...register("otp")}
                            />

                            {errors.otp && (
                                <p className="text-sm text-red-500 text-center mt-2">
                                    {errors.otp.message}
                                </p>
                            )}
                        </div>

                        {/* Resend OTP */}
                        <div className="text-center">
                            <p className="text-[#3D4040] font-[Inter] text-[14px] md:text-[15px] not-italic font-normal leading-[24px]">
                                Didn't receive the code?{' '}
                                <button
                                    type="button"
                                    onClick={handleResendOtp}
                                    className="underline [text-decoration-style:solid] [text-decoration-skip-ink:none] [text-underline-offset:auto] [text-underline-position:from-font] hover:underline text-[#3D4040] font-[Inter] text-[14px] md:text-[15px] not-italic font-medium leading-[24px] cursor-pointer"
                                >
                                    Resend OTP
                                </button>
                            </p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isPending || otp.some(digit => !digit)}
                            className={`w-full bg-[#3D4040] text-white py-3 rounded-lg hover:bg-gray-800 transition ${isPending || otp.some(digit => !digit) ? "opacity-60 cursor-not-allowed" : ""
                                }`}
                        >
                            {isPending ? "Verifying..." : "Verify OTP"}
                        </button>
                    </form>

                    {/* Timer (Optional) */}
                    <div className="mt-6 text-center">
                        <p className="text-[rgba(61,_64,_64,_0.60)] font-[Inter] text-[14px] md:text-[15px] not-italic font-normal leading-[24px]">
                            Code expires in 10:00 minutes
                        </p>
                    </div>

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

export default VerifyOtp;




