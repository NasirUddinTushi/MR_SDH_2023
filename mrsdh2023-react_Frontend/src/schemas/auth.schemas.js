import z from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  phone: z.string().min(1, "Phone number is required").min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

export const verifyOtpSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  otp: z.string().min(1, "OTP is required").length(4, "OTP must be 4 digits"),
});

export const resetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  otp: z.string().min(1, "OTP is required").length(4, "OTP must be 4 digits"),
  new_password: z.string().min(1, "New password is required").min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

export const changePasswordSchema = z.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: z.string().min(1, "New password is required").min(6, "Password must be at least 6 characters"),
  confirm_password: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required").min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters"),
});