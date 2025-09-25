import React from 'react'
import ctaImg from '../../assets/images/cta-img.png'
import { Link } from 'react-router';

const CtaSection = () => {
  return (
    <div className="relative bg-gray-600">
      <img
        src={ctaImg}
        alt="Team collaborating in a modern office"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 text-center">
        <h2
          className="text-[#FFF] text-center font-[Inter] text-[24px] sm:text-[30px] md:text-[40px] lg:text-[60px] not-italic font-semibold leading-[40px] md:leading-[50px] lg:leading-[70px]"
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="1500"
        >
          Ready to Transform Your Business?
        </h2>
        <p
          className="mt-4 text-[#FFF] text-center font-[Inter] text-[15px] md:text-[16px] not-italic font-normal leading-[28px] "
          data-aos="fade-up"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="1500"
        >
          Let's start a conversation about your goals. Schedule a free,
          no-obligation consultation with our experts today.
        </p>
        <div className="flex-col md:flex-row flex items-center gap-3 md:gap-4 mt-8 justify-center ">
          <Link
            to="/contact-us"
            className=" px-10 py-4 bg-inherit border border-white text-[#FFF] font-[Inter] text-[15px] md:text-[16px] not-italic font-medium leading-[24px] rounded-lg shadow-lg hover:text-[#222] hover:bg-gray-200 transition duration-300 min-w-[213px]"
          >
            Contact Us
          </Link>
          <Link
            to="/contact-us"
            className=" px-4 py-4 bg-white font-[Inter] text-[16px] not-italic border border-transparent font-medium leading-[24px] rounded-lg shadow-lg hover:bg-inherit hover:border-white hover:text-white transition duration-300 min-w-[213px]"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CtaSection