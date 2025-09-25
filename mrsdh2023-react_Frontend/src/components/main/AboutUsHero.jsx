import React from 'react'
import heroBg from '../../assets/images/heroBg.png'
import { Link } from 'react-router';
import { useAboutPage } from '@/hooks/cms.hook';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const AboutUsHero = () => {
  const { data: aboutPage, isLoading, error } = useAboutPage();

  if (isLoading) {
    return (
      <div className="relative bg-[#fbfdfe] text-white min-h-[70vh] md:min-h-[80vh] flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // Use CMS data with fallbacks
  const heroTitle = aboutPage?.hero_title || "We Know the Startup Hustle Because We've Lived It";
  const heroSubtitle = aboutPage?.hero_subtitle || "From launching ideas to scaling teams, our experience is rooted in the startup world. Learn about the people and passion behind our hands-on, practical consulting approach.";

  return (
    <div className="relative bg-[#fbfdfe] text-white">
      <img
        src={heroBg}
        alt="Modern cityscape"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] md:min-h-[80vh] text-center px-4">
        <h1 className="text-[#3D4040] text-center font-[NotoSans] text-[30px] sm:text-[40px] md:text-[50px] lg:text-[80px] not-italic font-semibold leading-[42px] md:leading-[72px] lg:leading-[82px] max-w-4xl">
          {heroTitle}
        </h1>
        <p className="mt-4 text-[rgba(61,_64,_64,_0.60)] text-center font-[Inter] text-[15px] md:text-[16px] not-italic font-normal leading-[28px] max-w-2xl">
          {heroSubtitle}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/contact-us"
            className="px-4 py-4 bg-[#3D4040] font-[Inter] text-[16px] not-italic border border-transparent text-[#F1F3F5] font-medium leading-[24px] rounded-lg shadow-lg hover:bg-inherit hover:border-[#3D4040] hover:text-[#3D4040] transition duration-300 min-w-[213px]"
          >
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsHero