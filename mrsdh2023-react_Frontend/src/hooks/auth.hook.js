import { axiosPublic, axiosPrivate } from "@/lib/axios.config";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { 
  signInSchema, 
  signUpSchema, 
  forgotPasswordSchema, 
  verifyOtpSchema, 
  resetPasswordSchema, 
  changePasswordSchema 
} from "@/schemas/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "@/contexts/AuthContext";

// Sign In Hook
export const useSignIn = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const redirectUrl = params.get("redirect");

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (credentials) => {
      const res = await axiosPublic.post("/account/login/", credentials);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Login response:", data); // Debug log
      
      // Handle API response structure: {status: 200, success: true, access: "token", user_id: 7, email: "..."}
      if (data?.status === 200 || data?.success === true || data?.code === 200 || data?.code === 201) {
        toast.success(data?.message || "Sign in successfully");
        
        // Extract token from different possible fields
        const token = data?.access || data?.token || data?.access_token;
        
        // Create user object from response
        const user = data?.data || data?.user || {
          id: data?.user_id,
          email: data?.email,
          name: data?.name
        };
        
        // Use AuthContext login method
        login(user, token);

        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate("/");
        }
      } else {
        // If we reach onSuccess but don't have expected structure, check for token
        const token = data?.access || data?.token || data?.access_token;
        if (token) {
          toast.success(data?.message || "Sign in successfully");
          const user = data?.data || data?.user || {
            id: data?.user_id,
            email: data?.email,
            name: data?.name
          };
          login(user, token);
          
          if (redirectUrl) {
            navigate(redirectUrl);
          } else {
            navigate("/");
          }
        } else {
          toast.error(data?.message || "Failed to sign in");
        }
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to sign in";

      if (
        typeof message === "string" &&
        message.toLowerCase().includes("email")
      ) {
        form.setError("email", { message });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending };
};

// Sign Up Hook
export const useSignUp = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (userData) => {
      console.log("Registration payload:", userData);
      console.log("Making request to:", "/account/register/");
      const res = await axiosPublic.post("/account/register/", userData);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Registration response:", data); // Debug log
      
      // Handle API response structure: {code: 201, message: "...", data: {...}}
      if (data?.code === 201 || data?.code === 200 || data?.status === true) {
        toast.success(data?.message || "Registration successful");
        navigate("/sign-in");
      } else {
        // If we reach onSuccess but don't have a success code, still treat as success
        toast.success(data?.message || "Registration successful");
        navigate("/sign-in");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Registration failed";

      // Handle field-specific errors
      if (error?.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((field) => {
          if (form.getFieldState(field)) {
            form.setError(field, { message: errors[field][0] });
          }
        });
      } else {
        toast.error(message);
      }
    },
  });

  return { form, mutate, isPending };
};

// Profile Hook
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/account/profile/");
      return res.data;
    },
    enabled: !!localStorage.getItem("token"),
  });
};

// Update Profile Hook
export const useUpdateProfile = () => {
  const { refetch } = useProfile();

  const { mutate, isPending } = useMutation({
    mutationFn: async (profileData) => {
      const formData = new FormData();
      
      if (profileData.profile_photo) {
        formData.append("profile_photo", profileData.profile_photo);
      }
      if (profileData.name) {
        formData.append("name", profileData.name);
      }

      const res = await axiosPrivate.patch("/account/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Profile updated successfully");
        refetch();
      } else {
        toast.error(data?.message || "Failed to update profile");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to update profile";
      toast.error(message);
    },
  });

  return { mutate, isPending };
};

// Forgot Password Hook
export const useForgotPassword = () => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/account/reset-password/request-otp/", data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "OTP sent to your email");
      } else {
        toast.error(data?.message || "Failed to send OTP");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to send OTP";
      toast.error(message);
    },
  });

  return { form, mutate, isPending };
};

// Verify OTP Hook
export const useVerifyOtp = () => {
  const form = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/account/reset-password/verify-otp/", data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "OTP verified successfully");
      } else {
        toast.error(data?.message || "Invalid OTP");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to verify OTP";
      toast.error(message);
    },
  });

  return { form, mutate, isPending };
};

// Reset Password Hook
export const useResetPassword = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      otp: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPublic.post("/account/reset-password/set-new-password/", data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Password reset successfully");
        navigate("/sign-in");
      } else {
        toast.error(data?.message || "Failed to reset password");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to reset password";
      toast.error(message);
    },
  });

  return { form, mutate, isPending };
};

// Change Password Hook
export const useChangePassword = () => {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosPrivate.post("/account/change-password/", data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message || "Password changed successfully");
        form.reset();
      } else {
        toast.error(data?.message || "Failed to change password");
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to change password";
      toast.error(message);
    },
  });

  return { form, mutate, isPending };
};

// Logout Hook
export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axiosPrivate.post("/account/logout/");
      return res.data;
    },
    onSuccess: (data) => {
      // Use AuthContext logout method
      logout();
      toast.success(data?.message || "Logged out successfully");
      navigate("/");
    },
    onError: (error) => {
      // Even if logout fails on server, clear auth state
      logout();
      toast.success("Logged out successfully");
      navigate("/");
    },
  });

  return { mutate, isPending };
};
