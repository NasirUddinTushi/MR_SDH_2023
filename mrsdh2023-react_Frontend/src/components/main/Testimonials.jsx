import React, { useState, useRef, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import CommonMiniHeader from '../shared/CommonMiniHeader';
import Subtitle from '../shared/Subtitle';
import Title from '../shared/Title';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTestimonials } from '@/hooks/cms.hook';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const testimonials = [
  {
    quote:
      'Working with them was a game-changer. Their insights led to a 40% increase in our operational efficiency. Truly remarkable.',
    name: 'Elena Rodriguez',
    title: 'CEO, Innovatech',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    quote:
      "The team's dedication and expertise are unmatched. They didn't just provide a solution; they became a part of our team.",
    name: 'Marcus Chen',
    title: 'Founder, QuantumLeap',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    quote:
      'Absolutely outstanding service. They helped us go from idea to execution faster than we thought possible.',
    name: 'Sophia Patel',
    title: 'CTO, BrightChain',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    quote:
      'Their commitment to our success was clear from day one. Highly recommended!',
    name: 'James White',
    title: 'COO, FutureSoft',
    avatar: 'https://i.pravatar.cc/150?img=8',
  },
];

const TestimonialCard = ({ quote, client_name, client_position, client_image, rating }) => {
  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://i.pravatar.cc/150?img=1';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/media')) {
      const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || '';
      return `${baseUrl}${imagePath}`;
    }
    return imagePath;
  };

  return (
    <div className="py-5">
      <div className="keen-slider__slide bg-white p-6 rounded-lg shadow-sm h-full flex flex-col justify-between">
        <div className="">
          <div className="flex items-center justify-center mb-4">
            {[...Array(rating || 5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-[#956D26]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-[#3D4040] text-center font-[Inter] md:text-[16px] text-[15px] not-italic font-normal leading-[28px]">
            {quote}
          </p>
        </div>
        <div className="flex flex-col gap-3 md:gap-4 items-center mt-6">
          <img
            src={getImageUrl(client_image)}
            alt={client_name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-[#3D4040] text-center font-[Inter] md:text-[16px] text-[15px] not-italic font-semibold leading-[150%]">
              {client_name}
            </p>
            <p className="text-[#3D4040] text-center font-[Inter] md:text-[16px] text-[15px] not-italic font-normal leading-[28px]">
              {client_position}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { data: cmsTestimonials, isLoading, error } = useTestimonials();

  // Use CMS data if available, otherwise use fallback
  const testimonialsData = cmsTestimonials && cmsTestimonials.length > 0 ? cmsTestimonials : testimonials;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  // Autoplay logic
  const timeoutRef = useRef();

  const clearNextTimeout = () => {
    clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    const nextTimeout = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (instanceRef.current) {
          instanceRef.current.next();
        }
      }, 3000); // autoplay every 3s
    };

    nextTimeout();
    const slider = instanceRef.current;
    slider?.on('dragStarted', clearNextTimeout);
    slider?.on('animationEnded', nextTimeout);
    slider?.on('updated', nextTimeout);

    return () => clearTimeout(timeoutRef.current);
  }, [instanceRef]);

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <LoadingSpinner size="lg" text="Loading testimonials..." />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <CommonMiniHeader miniHeaderText="Testimonials" />
          <div className="mt-2" data-aos="zoom-out-down">
            <Title titleText="Client Success Stories" />
          </div>
          <Subtitle subtitleText="Hear what our clients have to say about their experience working with us." />
        </div>

        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200"
          >
            <ChevronRight />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonialsData.map((_, i) => (
              <button
                key={i}
                onClick={() => instanceRef.current?.moveToIdx(i)}
                className={`h-3 w-3 rounded-full transition ${currentSlide === i ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
