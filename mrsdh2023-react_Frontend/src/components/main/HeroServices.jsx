import React from 'react'
import blackBg from '../../assets/images/MaskTop.png'
import whiteBg from '../../assets/images/MaskBottom.png'
import CommonMiniHeader from '../shared/CommonMiniHeader';
import Title from '../shared/Title';
import Subtitle from '../shared/Subtitle';
import { Link } from 'react-router';
import { useServices } from '@/hooks/cms.hook';
import LoadingSpinner from '@/components/shared/LoadingSpinner';


const ServiceCard = ({ title, description, highlighted = false }) => {
  const cardClasses = `p-8 md:p-12 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2 bg-cover bg-no-repeat bg-center text-left flex flex-col justify-between md:min-h-[405px] lg:min-h-[455px] ${highlighted ? 'bg-[#3d4040] text-white ' : 'bg-[#ffffff] text-gray-800'
    }`;
  const textColor = highlighted
    ? 'text-[rgba(255,_255,_255,_0.60)]'
    : 'text-[rgba(61,_64,_64,_0.60)]';
  const linkColor = highlighted
    ? 'text-white hover:text-gray-300'
    : 'text-[#3D4040] hover:text-gray-700';

  const backgroundImage = highlighted ? blackBg : whiteBg;

  return (
    <div
      className={cardClasses}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="">
        <h3 className="font-[NotoSans] text-[22px] md:text-[26px] lg:text-[30px] xl:text-[40px] not-italic font-semibold leading-[35px] md:leading-[40px]  xl:leading-[50px]  mt-4">
          {title}
        </h3>
        <p
          className={`mt-2  font-[Inter] text-[16px] not-italic font-normal leading-[28px] ${textColor}`}
        >
          {description}
        </p>
      </div>
      <Link
        to="/services"
        className={`mt-6 inline-block font-semibold ${linkColor}`}
      >
        Discover More →
      </Link>
    </div>
  );
};

const Services = () => {
  const { data: cmsServices, isLoading, error } = useServices();

  // Fallback services data
  const fallbackServices = [
    {
      title: 'Business Services',
      description: 'Strategic planning, market analysis, and operational improvements to scale your business effectively.',
      highlighted: true,
    },
    {
      title: 'Personal Credit & Financial Services',
      description: 'Tailored financial advice, credit management, and wealth-building strategies for individuals.',
    },
    {
      title: 'Homeownership Services',
      description: 'Expert guidance on partnership agreements, co-ownership structures, and investment syndication.',
      highlighted: true,
    },
    {
      title: 'Legal & Record Assistance',
      description: 'Comprehensive support for legal documentation, compliance, and maintaining meticulous records.',
    },
  ];

  // Use CMS data if available, otherwise use fallback
  const servicesData = cmsServices && cmsServices.length > 0
    ? cmsServices.map((service, index) => ({
      title: service.title,
      description: service.description,
      highlighted: index % 2 === 0, // Alternate highlighting
    }))
    : fallbackServices;

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <LoadingSpinner size="lg" text="Loading services..." />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center mb-12">
          <CommonMiniHeader miniHeaderText="Services" />
          <div className="mt-2" data-aos="zoom-out-down">
            <Title titleText="How We Help You Grow" />
          </div>
          <Subtitle subtitleText="Whether you're just starting or scaling up, our personalized consulting services are designed to guide you every step of the way." />
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services