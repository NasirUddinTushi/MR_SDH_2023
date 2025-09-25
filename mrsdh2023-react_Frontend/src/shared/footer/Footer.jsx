import React from 'react';
import footerLogo from '@/assets/images/logoWhite.png';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-[#3D4040] text-white font-read">
      <div className="w-11/12 mx-auto py-6 md:py-8 lg:py-12 xl:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 xl:gap-40 border-b border-[#45494F] py-16">
          <div className="flex-2/5 text-sm md:text-[16.5px] lg:text-[18.5px] xl:text-[19px]">
            <img src={footerLogo}></img>
            <p className="mt-5 md:mt-6 lg:mt-7  xl:mt-[32px] text-[rgba(255,_255,_255,_0.60)] font-[Inter] text-[16px] not-italic font-normal leading-[28px]">
              Lorem ipsum dolor sit amet consectetur. Dignissim ornare neque at
              ipsum placerat semper porttitor facilisi risus.
            </p>

            <div className="mt-6 md:mt-9 lg:mt-11  xl:mt-[64px]">
              <h3 className="text-[#FFF] font-[Inter] text-[17px] sm:text-[18px] md:text-[20px] not-italic font-semibold leading-[24px]">
                Follow Us
              </h3>
              <div className="flex items-center gap-3 md:gap-4 lg:gap-6 mt-4 md:mt-5 lg:mt-6">
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_16925_8587)">
                      <path
                        d="M12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12C24 5.37264 18.6274 0 12 0Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_16925_8587">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_16925_8588)">
                      <path
                        d="M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8687 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8062 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8062 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z"
                        fill="white"
                      />
                      <path
                        d="M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z"
                        fill="white"
                      />
                      <path
                        d="M19.8469 5.59238C19.8469 6.38926 19.2 7.03145 18.4078 7.03145C17.6109 7.03145 16.9688 6.38457 16.9688 5.59238C16.9688 4.79551 17.6156 4.15332 18.4078 4.15332C19.2 4.15332 19.8469 4.8002 19.8469 5.59238Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_16925_8588">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_16925_8589)">
                      <path
                        d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_16925_8589">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="flex-3/5 text-sm md:text-[17.5px] lg:text-[19.5px] xl:text-[21.5px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-12  xl:gap-[53px] ">
            {/* Company List */}
            <div className="">
              <h6 className="ext-[#FFF] font-[Inter] text-[17px] sm:text-[18px] md:text-[20px] not-italic font-semibold leading-[24px]">
                Company
              </h6>
              <div className="mt-[21.5px] text-[rgba(255,_255,_255,_0.60)] font-[Inter] text-[14px] sm:text-[15px] md:text-[16px] not-italic font-normal leading-[28px] flex flex-col gap-2.5">
                <Link to="/">Home</Link>
                <Link to="#">About Us</Link>
                <Link to="#">Services</Link>
                <Link to="#">Contact Us</Link>
              </div>
            </div>

            {/* others list */}
            <div className="">
              <h6 className="ext-[#FFF] font-[Inter] text-[17px] sm:text-[18px] md:text-[20px] not-italic font-semibold leading-[24px]">
                Our Services
              </h6>
              <div className="mt-[21.5px] text-[rgba(255,_255,_255,_0.60)] font-[Inter] text-[14px] sm:text-[15px] md:text-[16px] not-italic font-normal leading-[28px] flex flex-col gap-2.5">
                <Link>Business Services</Link>
                <Link>Personal Credit & Financial Services</Link>
                <Link>Homeownership Services</Link>
                <Link>Legal & Record Assistance</Link>
                <Link>Risk Management</Link>
              </div>
            </div>

            {/* follow us list */}
            <div className="">
              <h6 className="ext-[#FFF] font-[Inter] text-[17px] sm:text-[18px] md:text-[20px] not-italic font-semibold leading-[24px]">
                Contact Us
              </h6>
              <div className="mt-[21.5px] text-[rgba(255,_255,_255,_0.60)] font-[Inter] text-[14px] sm:text-[15px] md:text-[16px] not-italic font-normal leading-[28px] flex flex-col gap-2.5">
                {/* Phone Link */}
                <a
                  href="tel:+15551234567"
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
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  +1 (555) 123-4567
                </a>

                {/* Email Link */}
                <a
                  href="mailto:info@apexadvisory.com"
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
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  info@apexadvisory.com
                </a>

                {/* Location */}

                <a
                  href="https://www.google.com/maps?q=123+Business+Ave,+Suite+500,+New+York,+NY+10001,+USA"
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
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  123 Business Ave, Suite 500, New York, NY 10001, USA
                </a>

                {/*Date */}
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
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Mon-Fri: 9 AM - 6 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 md:mt-8 lg:mt-9 xl:mt-[42px] flex justify-between flex-col md:flex-row items-center">
          <p className="text-[rgba(255,_255,_255,_0.60)] font-[Inter] text-[14px] not-italic font-normal leading-[28px] md:text-[15px] lg:text-[16px] ">
            © 2025 Consulting Firm. All rights reserved.
          </p>
          <div className="flex  gap-2.5 md:gap-3 lg:gap-4 text-[rgba(255,_255,_255,_0.60)] font-[Inter] text-[14px] not-italic font-normal leading-[28px] md:text-[15px] lg:text-[16px]">
            <Link>Privacy Policy</Link>
            <div className="bg-[#B1B3B3] w-[1px] h-full"></div>
            <Link>Terms & Conditions</Link>
            <div className="bg-[#B1B3B3] w-[1px] h-full"></div>
            <Link>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
