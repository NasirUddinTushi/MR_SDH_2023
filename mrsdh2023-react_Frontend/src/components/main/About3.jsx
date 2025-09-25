import React from 'react';
import CommonMiniHeader from '../shared/CommonMiniHeader';
import Title from '../shared/Title';
import Subtitle from '../shared/Subtitle';
import serviceImg5 from '../../assets/images/service5.jpg';
import { useAboutPage } from '@/hooks/cms.hook';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const About3 = () => {
  const { data: aboutPage, isLoading, error } = useAboutPage();

  if (isLoading) {
    return (
      <section className="w-[100%] py-16 md:py-24 bg-white">
        <div className="flex justify-center">
          <LoadingSpinner size="lg" text="Loading vision section..." />
        </div>
      </section>
    );
  }

  // Use CMS data with fallbacks
  const visionTitle = aboutPage?.vision_title || "Our Vision";
  const visionDescription = aboutPage?.vision_description || "We envision a world where every business no matter its size has access to the right tools, insights, and guidance to thrive, innovate, and lead with confidence.";
  const visionImage = aboutPage?.vision_image;

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return serviceImg5;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/media')) {
      const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';
      return `${baseUrl}${imagePath}`;
    }
    return imagePath;
  };

  return (
    <section className="w-[100%] py-16 md:py-24 bg-white">
      <div className="px-4 md:pr-0 md:pl-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 md:w-1/2">
            <div className="flex flex-col items-start mb-12">
              <CommonMiniHeader miniHeaderText={visionTitle} />
              <div className="mt-2" data-aos="zoom-out-down">
                <Title titleText={visionTitle} />
              </div>
              <div
                data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="1500"
              >
                <Subtitle subtitleText={visionDescription} />
              </div>
            </div>
            <button className="mt-8 px-8 py-3 bg-[#FFF] text-[#3D4040] font-[Inter] text-[16px] not-italic font-medium leading-[24px] rounded-lg shadow-md hover:bg-[#3D4040] hover:text-white transition duration-300 cursor-pointer">
              Learn More
            </button>
          </div>
          {/* Image Section */}
          <div
            className="max-w-[637px] md:w-1/2"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <img
              src={getImageUrl(visionImage)}
              alt="Our vision"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About3;
