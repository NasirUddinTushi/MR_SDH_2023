import React from 'react';
import CommonMiniHeader from '../shared/CommonMiniHeader';
import Title from '../shared/Title';
import Subtitle from '../shared/Subtitle';
import heroBg from '../../assets/images/heroBg.png';
import { useContactForm } from '@/hooks/cms.hook';
import { useGeneralInfo } from '@/hooks/cms.hook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/schemas/auth.schemas';

const ContactSection = () => {
  // Get contact form functionality and general info
  const { mutate: submitContact, isPending } = useContactForm();
  const { data: generalInfo, isLoading: generalInfoLoading } = useGeneralInfo();

  // Form setup with validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Contact form payload:', data);
    submitContact(data, {
      onSuccess: () => {
        reset(); // Clear form on success
      }
    });
  };

  // Use CMS data for contact info with fallbacks
  const contactInfo = {
    phone: generalInfo?.phone || '+1 (555) 123-4567',
    email: generalInfo?.email || 'info@apexadvisory.com',
    address: generalInfo?.address || '123 Business Ave, Suite 500, New York, NY 10001, USA',
    workingHours: generalInfo?.working_hours || 'Mon-Fri: 9 AM - 6 PM',
  };

  return (
    <section className="relative py-16 px-4 md:px-16 lg:px-24 bg-gray-50">
      <img
        src={heroBg}
        alt="Modern cityscape"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="text-center mb-12">
        <div className="mt-2" data-aos="zoom-out-down">
          <Title titleText="Contact and Support" />
        </div>
        <div
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="1500"
        >
          <Subtitle subtitleText="We're here to help — get in touch with questions, comments, or support." />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-between relative z-10">
        {/* Contact Info */}
        <div className="md:w-1/2 space-y-6">
          <div className="">
            <h3 className="text-[#3D4040] font-[NotoSans] text-[22px] sm:text-[28px] md:text-[32px] lg:text-[50px] not-italic font-semibold leading-[30px] sm:leading-[40px] md:leading-[50px] lg:leading-[70px]">
              Contact us
            </h3>
            <p className="text-[rgba(61,_64,_64,_0.60)] font-[Inter] text-[15px] md:text-[16px] not-italic font-normal leading-[28px]">
              We're available to help you with any questions or support needs.
            </p>
          </div>
          <div className="mt-[21.5px] text-[#3D4040] font-[Inter] md:text-[16px] not-italic font-medium leading-[24px] text-[15px]] flex flex-col gap-2.5">
            {/* Phone Link */}
            <a
              href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`}
              className="flex items-center gap-1 md:gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z"
                  stroke="#3D4040"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {contactInfo.phone}
            </a>

            {/* Email Link */}
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-1 md:gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                  stroke="#3D4040"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {contactInfo.email}
            </a>

            {/* Location */}
            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(contactInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17.6569 16.6569C16.7202 17.5935 14.7616 19.5521 13.4138 20.8999C12.6327 21.681 11.3677 21.6814 10.5866 20.9003C9.26234 19.576 7.34159 17.6553 6.34315 16.6569C3.21895 13.5327 3.21895 8.46734 6.34315 5.34315C9.46734 2.21895 14.5327 2.21895 17.6569 5.34315C20.781 8.46734 20.781 13.5327 17.6569 16.6569Z"
                  stroke="#3D4040"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z"
                  stroke="#3D4040"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {contactInfo.address}
            </a>

            {/* Working Hours */}
            <p className="flex items-center gap-1 md:gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#3D4040"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {contactInfo.workingHours}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:w-1/2 bg-[#F2F3F3] p-6 md:p-8 lg:p-12 rounded">
          <h3 className="text-[#3D4040] font-[NotoSans] text-[22px] sm:text-[28px] md:text-[32px] lg:text-[50px] not-italic font-semibold leading-[30px] sm:leading-[40px] md:leading-[50px] lg:leading-[70px] mb-4">
            Get in Touch with Us
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1.5 md:gap-2">
              <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] not-italic font-semibold leading-[24px]">
                Name *
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full p-3 border rounded-[16px] border-[#C4C4C4] bg-[#FBFDFE]"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 md:gap-2">
              <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] not-italic font-semibold leading-[24px]">
                Email *
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full p-3 border rounded-[16px] border-[#C4C4C4] bg-[#FBFDFE]"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 md:gap-2">
              <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] not-italic font-semibold leading-[24px]">
                Phone Number *
              </label>
              <input
                type="text"
                placeholder="+1234567890"
                className="w-full p-3 border rounded-[16px] border-[#C4C4C4] bg-[#FBFDFE]"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 md:gap-2">
              <label className="text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] not-italic font-semibold leading-[24px]">
                Message *
              </label>
              <textarea
                placeholder="Tell us how we can help you..."
                className="w-full p-3 border rounded-[16px] border-[#C4C4C4] bg-[#FBFDFE] h-32 resize-none"
                {...register('message')}
              ></textarea>
              {errors.message && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`mt-6 px-6 py-3 rounded-[100px] text-[#F1F3F5] font-[Inter] text-[15px] sm:text-4 md:text-[17px] lg:text-[18px] not-italic font-medium leading-[24px] bg-[#3D4040] w-full hover:bg-inherit hover:border-[#3D4040] hover:text-[#3D4040] transition duration-300 border border-transparent ${isPending ? 'opacity-60 cursor-not-allowed' : ''
                }`}
            >
              {isPending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
