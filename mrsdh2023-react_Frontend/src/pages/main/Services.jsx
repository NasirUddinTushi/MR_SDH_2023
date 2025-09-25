import React from 'react';
import ServiceHero from '@/components/main/ServiceHero';
import Countdown from '@/components/main/Countdown';
import ServiceAbout from '@/components/main/ServiceAbout';
import serviceImg1 from '../../assets/images/service1.jpg';
import serviceImg2 from '../../assets/images/service2.jpg';
import serviceImg3 from '../../assets/images/service3.jpg';
import serviceImg4 from '../../assets/images/service4.jpg';
import Faq from '@/components/main/Faq';
import CtaSection from '@/components/main/CtaSection';
import { useServices } from '@/hooks/cms.hook';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const Services = () => {
  const { data: cmsServices, isLoading, error } = useServices();

  // Fallback services data
  const fallbackServices = [
    {
      miniHeader: 'Business Servicess',
      title: 'Strategic Solutions for Modern Businesses',
      subtitle: 'We provide comprehensive business consulting tailored to your specific needs.',
      image: serviceImg1,
      buttonText: 'Book a Free Consultation',
      list: [
        'Business Planning & Strategy',
        'Operations Optimization',
        'Market Research & Analysis',
        'Business Registration & Licensing',
        'Staff Training & Development',
      ],
    },
    {
      miniHeader: 'Personal Credit & Financial Services',
      title: 'Improve Your Financial Health with Confidence',
      subtitle: 'Take control of your financial future with expert advice and actionable steps.',
      image: serviceImg2,
      buttonText: 'Book a Free Consultation',
      list: [
        'Credit Score Analysis',
        'Debt Consolidation Support',
        'Budgeting & Saving Plans',
        'Loan Consultation',
      ],
    },
    {
      miniHeader: 'Homeownership Services',
      title: 'Achieve Your Dream of Homeownership',
      subtitle: 'Guiding you through the complex process with clarity and care.',
      image: serviceImg3,
      buttonText: 'Book a Free Consultation',
      list: [
        'Mortgage Readiness Check',
        'First-time Buyer Assistance',
        'Document Review & Support',
      ],
    },
    {
      miniHeader: 'Legal & Record Assistance',
      title: 'Handle Legal Matters with Ease',
      subtitle: 'Simplifying your legal needs through our trusted partner network.',
      image: serviceImg4,
      buttonText: 'Book a Free Consultation',
      list: [
        'Legal Consultation Scheduling',
        'Record Correction Support',
        'Notary Services',
      ],
    },
  ];

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return serviceImg1;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/media')) {
      const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';
      return `${baseUrl}${imagePath}`;
    }
    return imagePath;
  };

  // Helper function to extract list items from description
  const extractListFromDescription = (description) => {
    if (!description) return [];

    // Split description by double line breaks to separate main text from list
    const parts = description.split('\r\n\r\n');
    if (parts.length > 1) {
      // Take everything after the first part and split by line breaks
      return parts.slice(1).join('\r\n').split('\r\n').filter(item => item.trim());
    }
    return [];
  };

  // Transform CMS data to match ServiceAbout component props
  const transformCMSServices = (services) => {
    return services.map((service) => ({
      miniHeader: service.title,
      title: service.title,
      subtitle: service.description ? service.description.split('\r\n\r\n')[0] : service.title,
      image: getImageUrl(service.image),
      buttonText: 'Book a Free Consultation',
      list: extractListFromDescription(service.description),
    }));
  };

  // Use CMS data if available, otherwise use fallback
  const servicesData = cmsServices && cmsServices.length > 0
    ? transformCMSServices(cmsServices)
    : fallbackServices;

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <ServiceHero />
        <div className="flex justify-center py-16">
          <LoadingSpinner size="lg" text="Loading services..." />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <ServiceHero />
      <Countdown />
      {servicesData.map((item, index) => (
        <ServiceAbout key={index} {...item} reverse={index % 2 !== 0} />
      ))}
      <Faq />
      <CtaSection />
    </div>
  );
};

export default Services;
