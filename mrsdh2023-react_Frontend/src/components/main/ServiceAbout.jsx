import React from 'react';
import CommonMiniHeader from '../shared/CommonMiniHeader';
import Title from '../shared/Title';
import Subtitle from '../shared/Subtitle';
import { Link } from 'react-router';

const ServiceAbout = ({
  image,
  miniHeader,
  title,
  subtitle,
  buttonText,
  reverse,
  list = [],
}) => {
  return (
    <section className="py-16 bg-white">
      <div
        className={`flex flex-col md:flex-row ${
          reverse ? 'md:flex-row-reverse' : ''
        } items-center gap-10 px-4`}
      >
        {/* Image */}
        <div
          className="md:w-1/2 w-full h-[375px] sm:h-[425px] md:h-[475px] lg:h-[575px] "
          data-aos={reverse ? 'fade-left' : 'fade-right'}
        >
          <img
            src={image}
            alt={title}
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="md:w-1/2">
          {/* <CommonMiniHeader miniHeaderText={miniHeader} /> */}
          <div className="mt-2">
            <Title titleText={title} />
          </div>
          <div className="mt-4">
            <Subtitle subtitleText={subtitle} />
          </div>

          {/* Feature List */}
          <ul className="mt-6 space-y-2 list-disc list-inside text-gray-700">
            {list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <Link>
            <button className="mt-6 md:mt-8 lg:mt-12 px-10 py-4 bg-inherit border border-[#3D4040] text-[#3D4040] font-[Inter] text-[15px] md:text-[16px] not-italic font-medium leading-[24px] rounded-lg shadow-lg hover:text-[#F1F3F5] hover:bg-[#3D4040] transition duration-300 min-w-[213px] cursor-pointer">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceAbout;
