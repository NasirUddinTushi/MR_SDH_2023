
import React, { useState } from 'react';
import CommonMiniHeader from '../shared/CommonMiniHeader';
import Title from '../shared/Title';
import Subtitle from '../shared/Subtitle';
import { useFAQs } from '@/hooks/cms.hook';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clip-path="url(#clip0_16960_490)">
      <path
        d="M7.13736 18.1374L17.6777 17.364M17.6777 17.364L18.4511 6.82365M17.6777 17.364L5.65685 5.34315"
        stroke="#3D4040"
        stroke-width="2"
      />
    </g>
    <defs>
      <clipPath id="clip0_16960_490">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        <span
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
            }`}
        >
          <ChevronDownIcon />
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="overflow-hidden">
          <p className="pt-4 text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const { data: cmsFaqs, isLoading, error } = useFAQs();

  // Fallback FAQ data
  const fallbackFaqs = [
    {
      question: 'What industries do you specialize in?',
      answer:
        'We have a diverse team with experience across technology, finance, healthcare, and retail. Our core strength is applying cross-industry best practices to solve unique business challenges.',
    },
    {
      question: 'How do you measure the success of a project?',
      answer:
        "Success is measured against pre-defined KPIs that we establish with you at the project's outset. These typically include metrics like revenue growth, cost savings, market share, and customer satisfaction.",
    },
    {
      question: 'What is your typical engagement model?',
      answer:
        'We offer flexible engagement models, from project-based consulting to long-term retainer partnerships. We tailor our approach to fit your specific needs and budget.',
    },
    {
      question: 'How long does a typical consulting project take?',
      answer:
        'Project timelines vary based on scope and complexity, but a typical engagement lasts between 3 to 6 months. We focus on delivering actionable results in phases to provide value quickly.',
    },
  ];

  // Use CMS data if available, otherwise use fallback
  const faqData = cmsFaqs && cmsFaqs.length > 0 ? cmsFaqs : fallbackFaqs;

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <CommonMiniHeader miniHeaderText="FAQ" />
            </div>
            <div className="mt-2" data-aos="zoom-out-down">
              <Title titleText="Frequently Asked Questions" />
            </div>
            <div
              data-aos="fade-left"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration="1500"
            >
              <Subtitle subtitleText="Find answers to common questions about our services and process." />
            </div>
          </div>
          <div className="flex justify-center">
            <LoadingSpinner size="lg" text="Loading FAQs..." />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center">
            <CommonMiniHeader miniHeaderText="FAQ" />
          </div>
          <div className="mt-2" data-aos="zoom-out-down">
            <Title titleText="Frequently Asked Questions" />
          </div>
          <div
            data-aos="fade-left"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="1500"
          >
            <Subtitle subtitleText="Find answers to common questions about our services and process." />
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq