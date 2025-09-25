import React from 'react';
import CommonMiniHeader from '../shared/CommonMiniHeader';
import Title from '../shared/Title';
import Subtitle from '../shared/Subtitle';
import about2 from '../../assets/images/about2.png'

const About2 = () => {
  return (
    <section className="w-[100%]  py-16 md:py-24 bg-white">
      <div className="px-4 md:pl-0 md:pr-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Image Section */}
          <div
            className="max-w-[637px] md:w-1/2"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
          >
            <img
              src={about2}
              alt="Business professionals collaborating"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          {/* Text Content Section */}
          <div className="flex-1 md:w-1/2">
            <div className="flex flex-col items-start mb-12 ">
              <CommonMiniHeader miniHeaderText="About us" />
              <div className="mt-2 " data-aos="zoom-out-down">
                <Title titleText="We Don’t Just Consult We Collaborate, Empower, and Create Lasting Impact" />
              </div>
              <div
                data-aos="fade-left"
                data-aos-anchor="#example-anchor"
                data-aos-offset="500"
                data-aos-duration="1500"
              >
                <Subtitle subtitleText="At the core of our work is one belief: business should be smarter, faster, and more human. We blend strategic thinking with bold action to help our clients adapt, lead, and thrive in a rapidly changing world." />
              </div>
            </div>
            <button className="mt-8 px-8 py-3 bg-[#3D4040] text-white font-[Inter] text-[16px] not-italic font-medium leading-[24px] rounded-lg shadow-md hover:bg-gray-700 transition duration-300 cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About2;
