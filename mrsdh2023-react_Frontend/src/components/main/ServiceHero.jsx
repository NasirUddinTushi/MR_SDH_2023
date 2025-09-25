import React from 'react';
import serviceHero from '../../assets/images/serviceHero.png'
import heroBg from '../../assets/images/heroBg.png';
import { Link } from 'react-router';

const ServiceHero = () => {
  return (
    <section className="bg-white py-20 px-4 md:px-12 relative">
      <img
        src={heroBg}
        alt="Modern cityscape"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 relative z-10">
        {/* Left Content */}
        <div className="md:w-1/2  md:text-left">
          <h1 className="text-[#3D4040] font-[Inter] text-[30px] sm:text-[40px] md:text-[50px] lg:text-[80px] not-italic font-semibold leading-[42px] md:leading-[72px] lg:leading-[82px] max-w-4xl">
            We’re With You, Every Step of the Way
          </h1>
          <p className="mt-4 mb-6 text-[rgba(61,_64,_64,_0.60)] font-[Inter] text-[15px] md:text-[16px] not-italic font-normal leading-[28px] max-w-2xl">
            Our consulting services are built around collaboration, trust, and
            real results. No guesswork just guidance that works for you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/contact-us"
              className="px-4 py-4 bg-[#3D4040] flex  justify-center font-[Inter] text-[16px] not-italic border border-transparent text-[#F1F3F5] font-medium leading-[24px] rounded-lg shadow-lg hover:bg-inherit hover:border-[#3D4040] hover:text-[#3D4040] transition-all duration-300 min-w-[213px] cursor-pointer"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <img
            src={serviceHero}
            alt="Team collaboration"
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
