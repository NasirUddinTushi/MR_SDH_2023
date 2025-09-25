import { axiosPublic } from "@/lib/axios.config";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

// CMS Data Hook
export const useCMSData = () => {
  return useQuery({
    queryKey: ["cms-data"],
    queryFn: async () => {
      console.log("Fetching CMS data...");
      const res = await axiosPublic.get("/cms/");
      console.log("CMS response:", res.data);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

// Individual data hooks for specific sections
export const useGeneralInfo = () => {
  const { data, isLoading, error } = useCMSData();
  return {
    data: data?.data?.general_info,
    isLoading,
    error,
  };
};

export const useAboutPage = () => {
  const { data, isLoading, error } = useCMSData();
  return {
    data: data?.data?.about_page,
    isLoading,
    error,
  };
};

export const useStatistics = () => {
  const { data, isLoading, error } = useCMSData();
  return {
    data: data?.data?.statistics || [],
    isLoading,
    error,
  };
};

export const useTeamMembers = () => {
  const { data, isLoading, error } = useCMSData();
  return {
    data: data?.data?.team_members || [],
    isLoading,
    error,
  };
};

export const useTestimonials = () => {
  const { data, isLoading, error } = useCMSData();
  return {
    data: data?.data?.testimonials || [],
    isLoading,
    error,
  };
};

export const useServices = () => {
  const { data, isLoading, error } = useCMSData();
  return {
    data: data?.data?.services || [],
    isLoading,
    error,
  };
};

export const useFAQs = () => {
  const { data, isLoading, error } = useCMSData();
  return {
    data: data?.data?.faqs || [],
    isLoading,
    error,
  };
};

// Hook for contact form submission
export const useContactForm = () => {
  const { mutate, isPending, isSuccess, isError } = useMutation({
    mutationFn: async (formData) => {
      console.log("Submitting contact form:", formData);
      const res = await axiosPublic.post("/cms/contact/", formData);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Contact form response:", data);
      if (data?.status === 200 || data?.status === 201 || data?.success === true) {
        toast.success(data?.message || "Message sent successfully!");
      } else {
        toast.error(data?.message || "Failed to send message");
      }
    },
    onError: (error) => {
      console.error("Contact form error:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error.message ||
        "Failed to send message";
      toast.error(message);
    },
  });

  return { mutate, isPending, isSuccess, isError };
};
